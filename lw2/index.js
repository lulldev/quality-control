const request = require('request');
const cheerio = require('cheerio');
const validator = require('validator');
const commandLineArgs = require('command-line-args');
const fs = require('fs');

const optionDefinitions = [
  { name: 'url', alias: 'U', type: String}
]
const options = commandLineArgs(optionDefinitions);
if (!options.hasOwnProperty('url')) {
  console.log('URL parametr is empty!');
  process.exit(1);
}

let targetUrl = options.url;
if (!validator.isURL(targetUrl)) {
  console.log('URL link is not valide');
  process.exit(2);
}

const fAllLinks = fs.createWriteStream('all-links.txt');
const fBrokenLinks = fs.createWriteStream('broken-links.txt');
let testedLinks = [];

const parseAndTestLinks = (nextLink) => {
  request({ uri: nextLink, method: 'GET', encoding: 'binary' },
    function (err, res, page) {
      if (res && res.statusCode == '200') {
        const $ = cheerio.load(page);
        let links = $('a');
        $(links).each(function(i, link){
          const parsedLink = $(link).attr('href');
          if (parsedLink && validator.isURL(parsedLink) && testedLinks.indexOf(parsedLink) === -1 &&
              parsedLink.indexOf(targetUrl) > -1) {
            fAllLinks.write(`${parsedLink} ${res.statusCode}\n`);
            testedLinks.push(parsedLink);
            parseAndTestLinks(parsedLink);
          }
        });
      } else {
        let code;
        if (typeof res !== 'object') {
          code = '500';
        } else {
          code = res.statusCode;
        }
        fBrokenLinks.write(`${nextLink} ${code}\n`);
        testedLinks.push(nextLink);
      }
    });
}; 

parseAndTestLinks(targetUrl);

const request = require('request');
const cheerio = require('cheerio');
const validator = require('validator');
const commandLineArgs = require('command-line-args');
const fs = require('fs');

function extractHostname(url) {
    var hostname;
    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
}


const optionDefinitions = [
  { name: 'url', alias: 'u', type: String }
]
const options = commandLineArgs(optionDefinitions);
if (!options.hasOwnProperty('url')) {
  console.log('URL ссылка не указана');
  process.exit(1);
}

let targetUrl = options.url;
let targetDomain = extractHostname(targetUrl);
if (!validator.isURL(targetUrl)) {
  console.log('URL ссылка указана неверно');
  process.exit(2);
}

let brokenLinksCounter = 0;
let allLinksCounter = 0;
const fAllLinks = fs.createWriteStream('all-links.txt');
const fBrokenLinks = fs.createWriteStream('broken-links.txt');
let testedLinks = [];

const parseAndTestLinks = (nextLink) => {
  request({ uri: nextLink, method: 'GET', encoding: 'binary' }, (err, res, page) => {
    if (res && res.statusCode == '200') {
      const $ = cheerio.load(page);
      let links = $('a');
      $(links).each(function (i, link) {
        const parsedLink = $(link).attr('href');
        if (parsedLink && validator.isURL(parsedLink) && testedLinks.indexOf(parsedLink) === -1 &&
          parsedLink.indexOf(targetDomain) > -1) {
          fAllLinks.write(`${parsedLink} ${res.statusCode}\n`);
          testedLinks.push(parsedLink);
          allLinksCounter++;
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
      fAllLinks.write(`${nextLink} ${code}\n`);
      brokenLinksCounter++;
      allLinksCounter++;
      testedLinks.push(nextLink);
    }
  });
}; 

parseAndTestLinks(targetUrl);

process.on('exit', (code) => {
  const datetime = new Date().toISOString().
    replace(/T/, ' ').
    replace(/\..+/, '');
  fAllLinks.write(`Всего ссылок: ${allLinksCounter}\nДата и время: ${datetime}`);
  fBrokenLinks.write(`Всего ссылок: ${brokenLinksCounter}\nДата и время: ${datetime}`);
});

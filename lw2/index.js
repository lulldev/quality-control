const request = require('request');
const cheerio = require('cheerio');
const validator = require('validator');
const commandLineArgs = require('command-line-args');

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

request({ uri: targetUrl, method: 'GET', encoding: 'binary' },
  function (err, res, page) {
    const $ = cheerio.load(page);
    let links = $('a');
    $(links).each(function(i, link){
      parsedLink = $(link).attr('href');
      if (validator.isURL(parsedLink)) {
        console.log(parsedLink);
      }
    });
  });
const request = require('request');
const cheerio = require('cheerio');
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

// request({ uri: 'http://www.amazon.com/', method: 'GET', encoding: 'binary' },
//   function (err, res, page) {
//     //Передаём страницу в cheerio
//     var $ = cheerio.load(page);
//     //Идём по DOM-дереву обычными CSS-селекторами
//     img_src = $('div.s9a3 > div > div > a > div > div > img').attr("src");
//     console.log(img_src);
//   });
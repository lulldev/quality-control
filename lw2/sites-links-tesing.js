var request = require('request');
var cheerio = require('cheerio');

request({ uri: 'http://www.amazon.com/', method: 'GET', encoding: 'binary' },
  function (err, res, page) {
    //Передаём страницу в cheerio
    var $ = cheerio.load(page);
    //Идём по DOM-дереву обычными CSS-селекторами
    img_src = $('div.s9a3 > div > div > a > div > div > img').attr("src");
    console.log(img_src);
  });
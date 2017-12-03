const request = require('request');
const cheerio = require('cheerio');
const validator = require('validator');
const commandLineArgs = require('command-line-args');
const fs = require('fs');

const Crawler = require("js-crawler");

const config = {
  allLinksFilename: 'all-links.txt',
  brokenLinksFilename: 'broken-links.txt',
  optionDefinitions: [{ name: 'url', alias: 'u', type: String }]
};

const options = commandLineArgs(config.optionDefinitions);
if (!options.hasOwnProperty('url')) {
  console.log('URL ссылка не указана');
  process.exit(1);
}

let extractDomain = (url) => {
  let domain;
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  }
  else {
    domain = url.split('/')[0];
  }
  domain = domain.split(':')[0];
  domain = domain.split('?')[0];
  return domain;
}

let targetUrl = options.url;
let targetDomain = extractDomain(targetUrl);
if (!validator.isURL(targetUrl)) {
  console.log('URL ссылка указана неверно');
  process.exit(2);
}

const crawler = new Crawler().configure({
  shouldCrawl: function(url) {
    return (url.indexOf(targetDomain) > 0);
  },
  ignoreRelative: false, depth: 100
});

let allLinksCounter = 0;
let brokenLinksCounter = 0;
fs.writeFile(config.allLinksFilename, '');
fs.writeFile(config.brokenLinksFilename, '');

crawler.crawl({
  url: targetUrl,
  success: function(page) {
    allLinksCounter++;
    console.log(page.url);
  },
  failure: function(page) {
    fs.appendFileSync(config.brokenLinksFilename, `${page.url} ${page.status}\n`);
    brokenLinksCounter++;
  },
  finished: function(crawledUrls) {
    const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const datetimeReportStr = `Время тестирования: ${datetime}`;
  
    fs.appendFileSync(config.allLinksFilename, `${datetimeReportStr}, Всего ссылок: ${allLinksCounter}\n`);
    fs.appendFileSync(config.brokenLinksFilename, `${datetimeReportStr}, Всего ссылок: ${brokenLinksCounter}\n`);
  }
});
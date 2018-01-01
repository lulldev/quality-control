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
  shouldCrawl: function (url) {
    return (url.indexOf(targetDomain) > 0);
  },
  ignoreRelative: false,
  depth: 50
});

const issetLink = (targetLink, allLinks) => {
  let isset = false;
  allLinks.forEach((link) => {
    if (link.indexOf(targetLink) > -1) {
      isset = true;
    }
  });
  return isset;
};

const isOwnLink = (link, targetDomain) => {
  return (validator.isURL(link) && link.indexOf(targetDomain) > -1);
};

const prepareLink = (link, targetDomain) => {
  link = String(link);
  if (!validator.isURL(link) || link.indexOf('http') !== 0) {
    return `http://${targetDomain}/${link}`
  }
  return link;
};

let allLinksFromPage = [];
let brokenLinks = [];
fs.writeFile(config.allLinksFilename, '');
fs.writeFile(config.brokenLinksFilename, '');

crawler.crawl({
  url: targetUrl,
  success: function (page, crawledUrls) {
    const $ = cheerio.load(page.body);
    const links = $('a');
    $(links).each(function (i, link) {
      const preparedLink = prepareLink($(link).attr('href'), targetDomain);
      new Crawler().configure({ depth: 1 })
        .crawl({
          url: preparedLink,
          success: () => {
            allLinksFromPage.push(preparedLink);
          },
          failure: (page) => {
            brokenLinks.push({ url: page.url, status: page.status });
          }
        });
    });
  },
  failure: function (page) {
    brokenLinks.push({ url: page.url, status: page.status });
  },
  finished: function (crawledUrls) {
    allLinksFromPage.forEach((link) => {
      if (!issetLink(link, crawledUrls) && isOwnLink(link, targetDomain)) {
        crawledUrls.push(link);
      }
    });

    let brokenLinkCounter = 0;
    let issetBrokenLinks = [];
    // todo: убрать дубликаты и вывести
    brokenLinks.forEach((link) => {
      if (issetBrokenLinks.indexOf(link.url) === -1) {
        fs.appendFileSync(config.brokenLinksFilename, `${link.url} ${link.status}\n`);
        brokenLinkCounter++;
        issetBrokenLinks.push(link.url);
      }
    });

    crawledUrls.forEach((link) => {
      fs.appendFileSync(config.allLinksFilename, `${link}\n`);
    });

    const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const datetimeReportStr = `Время тестирования: ${datetime}`;

    fs.appendFileSync(config.allLinksFilename, `${datetimeReportStr}, Всего ссылок: ${crawledUrls.length}\n`);
    fs.appendFileSync(config.brokenLinksFilename, `${datetimeReportStr}, Всего ссылок: ${brokenLinkCounter}\n`);
  }
});
const request = require('request');
const cheerio = require('cheerio');
const validator = require('validator');
const commandLineArgs = require('command-line-args');
const fs = require('fs');

let extractHostname = (url) => {
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
let allLinks = [];
let brokenLinks = [];

const isValidLink = (link) => {
  return (link.indexOf('javascript') === -1);
};

const isOwnLink = (link, targetDomain) => {
  return (validator.isURL(link) && link.indexOf(targetDomain) > -1);
};

const prepareLink = (link, targetDomain) => {
  if (!validator.isURL(link) || link.indexOf('http') !== 0) {
    return `http://${targetDomain}/${link}`
  }
  return link;
};

const issetLink = (link, allLinks) => {
  allLinks.forEach((linkData) => {
    if (link === linkData.link) {
      return true;
    }
  });
  return false;
};

const parseAndTestLinks = (nextLink) => {
  request({ uri: nextLink, method: 'GET', encoding: 'binary' }, (err, res, page) => {
    if (res && res.statusCode == '200') {
      const $ = cheerio.load(page);
      let links = $('a');
      $(links).each(function (i, link) {
        let parsedLink = $(link).attr('href');
        parsedLink = prepareLink(parsedLink, targetDomain);
        allLinksCounter++;
        if (isValidLink(parsedLink) && isOwnLink(parsedLink, targetDomain) && !issetLink(parsedLink, allLinks)) {
          parseAndTestLinks(parsedLink);
          allLinks.push({ link: parsedLink, status: res.statusCode });
        }
      });
    } else {
      let code;
      if (typeof res !== 'object') {
        code = '500';
      } else {
        code = res.statusCode;
      }
      if (!issetLink(nextLink, allLinks)) {
        brokenLinks.push({ link: nextLink, status: code });
        allLinks.push({ link: nextLink, status: code });
      }
    }
  });
};

parseAndTestLinks(targetUrl);

process.on('exit', (code) => {

  let allLinksClear = allLinks.sort((a, b) => { return a.link < b.link ? -1 : 1; }).reduce((allLinks, el) => {
    if (!allLinks.length || allLinks[allLinks.length - 1].link != el.link) {
      allLinks.push(el);
    }
    return allLinks;
  }, []);

  const datetime = new Date().toISOString().
    replace(/T/, ' ').
    replace(/\..+/, '');
  fAllLinks.write(`Всего ссылок: ${allLinksClear.length}\nДата и время: ${datetime}`);
  // fBrokenLinks.write(`Всего ссылок: ${brokenLinksCounter}\nДата и время: ${datetime}`);
});

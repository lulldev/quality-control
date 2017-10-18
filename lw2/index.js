const request = require('request');
const cheerio = require('cheerio');
const validator = require('validator');
const commandLineArgs = require('command-line-args');
const fs = require('fs');

const config = {
  allLinksFilename: 'all-links.txt',
  brokenLinksFilename: 'broken-links.txt',
};

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

let allLinks = [];
let linksArr = [];

const isValidLink = (link) => {
  return (link.indexOf('javascript') === -1);
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

const issetLink = (link, allLinks) => {
  return allLinks.some(elem => elem.link === link);
};

const removeDuplicatesLinks = (linksArr) => {
  let issetLinks = [];
  linksArr.forEach((linkData, i) => {
    if (issetLinks.indexOf(linkData.link) > -1) {
      linksArr.splice(i, 1);
    }
    issetLinks.push(linkData.link);
  });
  return linksArr;
};

const parseAndTestLinks = (nextLink) => {
  request({ uri: nextLink, method: 'GET', encoding: 'binary' }, (err, res, page) => {
    if (res && res.statusCode == '200') {
      const $ = cheerio.load(page);
      let links = $('a');
      $(links).each(function (i, link) {
        let parsedLink = $(link).attr('href');
        parsedLink = prepareLink(parsedLink, targetDomain);
        if (isValidLink(parsedLink) && isOwnLink(parsedLink, targetDomain) && linksArr.indexOf(parsedLink) === -1) {
          parseAndTestLinks(parsedLink);
          allLinks.push({ link: parsedLink, status: res.statusCode });
          linksArr.push(parsedLink);
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
        allLinks.push({ link: nextLink, status: code });
        linksArr.push(nextLink);
      }
    }
  });
};

parseAndTestLinks(targetUrl);

process.on('exit', (code) => {

  fs.writeFile(config.allLinksFilename, '');
  fs.writeFile(config.brokenLinksFilename, '');

  let allUniqueLinks = removeDuplicatesLinks(allLinks);
  let brokenLinksCount = allUniqueLinks.reduce((sum, linkData) => {
    if (linkData.status != 200) {
      sum++;
    }
    return sum;
  }, 0);

  allUniqueLinks.forEach((linkData) => {
    if (linkData.status !== 200) {
      fs.appendFileSync(config.brokenLinksFilename, `${linkData.link} ${linkData.status}\n`);
    } 
    fs.appendFileSync(config.allLinksFilename, `${linkData.link} ${linkData.status}\n`);
  });

  const datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  const datetimeReportStr = `Время тестирования: ${datetime}`;
  
  fs.appendFileSync(config.allLinksFilename, `${datetimeReportStr}, Всего ссылок: ${allLinks.length}\n`);
  fs.appendFileSync(config.brokenLinksFilename, `${datetimeReportStr}, Всего ссылок: ${brokenLinksCount}\n`);
});

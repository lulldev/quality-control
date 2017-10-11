const request = require('request');
const cheerio = require('cheerio');
const validator = require('validator');
const commandLineArgs = require('command-line-args');
const fs = require('fs');
const linkChecker = require('./link-checker');

const config = {
  allLinksFilename: 'all-links.txt',
  brokenLinksFilename: 'broken-links.txt',
};

const optionDefinitions = [
  { name: 'url', alias: 'u', type: String }
]
const options = commandLineArgs(optionDefinitions);
if (!options.hasOwnProperty('url')) {
  console.log('URL ссылка не указана');
  process.exit(1);
}

let targetUrl = options.url;
let targetDomain = linkChecker.extractHostname(targetUrl);
if (!validator.isURL(targetUrl)) {
  console.log('URL ссылка указана неверно');
  process.exit(2);
}

let allLinks = [];

const parseAndTestLinks = (nextLink) => {
  request({ uri: nextLink, method: 'GET', encoding: 'binary' }, (err, res, page) => {
    if (res && res.statusCode == '200') {
      const $ = cheerio.load(page);
      let links = $('a');
      $(links).each(function (i, link) {
        let parsedLink = $(link).attr('href');
        parsedLink = linkChecker.prepareLink(parsedLink, targetDomain);
        if (linkChecker.isValidLink(parsedLink) && linkChecker.isOwnLink(parsedLink, targetDomain) && 
            !linkChecker.issetLink(parsedLink, allLinks)) {
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
      if (!linkChecker.issetLink(nextLink, allLinks)) {
        allLinks.push({ link: nextLink, status: code });
      }
    }
  });
};

parseAndTestLinks(targetUrl);

process.on('exit', (code) => {

  fs.writeFile(config.allLinksFilename, '');
  fs.writeFile(config.brokenLinksFilename, '');

  let allLinksClear = allLinks.sort((a, b) => { return a.link < b.link ? -1 : 1; }).reduce((allLinks, el) => {
    if (!allLinks.length || allLinks[allLinks.length - 1].link != el.link) {
      allLinks.push(el);
    }
    return allLinks;
  }, []);

  let brokenLinksCount = allLinksClear.reduce((sum, linkData) => {
    if (linkData.status !== 200) {
      sum++;
    }
    return sum;
  }, 0);

  allLinksClear.forEach((linkData) => {
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

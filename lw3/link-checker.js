const request = require('request');
const cheerio = require('cheerio');
const validator = require('validator');
const commandLineArgs = require('command-line-args');
const fs = require('fs');

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
  allLinks.forEach((linkData) => {
    if (link === linkData.link) {
      return true;
    }
  });
  return false;
};

const removeDuplicatesLinks = (linksArr) => {
  let issetLinks = [];
  linksArr.forEach((linkData, i) => {
    if (issetLinks.indexOf(linkData.link) > -1) {
      linksArr.splice(i, 1);
    }
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

module.exports = {
  isValidLink: isValidLink,
  isOwnLink: isOwnLink,
  prepareLink: prepareLink,
  issetLink: issetLink,
  removeDuplicatesLinks: removeDuplicatesLinks,
  parseAndTestLinks: parseAndTestLinks
};

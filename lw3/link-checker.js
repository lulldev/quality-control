const validator = require('validator');

const extractHostname = (url) => {
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

module.exports = {
  extractHostname: extractHostname,
  isValidLink: isValidLink,
  isOwnLink: isOwnLink,
  prepareLink: prepareLink,
  issetLink: issetLink,
  parseAndTestLinks: parseAndTestLinks
};

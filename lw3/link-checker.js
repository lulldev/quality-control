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

module.exports = {
  extractHostname: extractHostname,
  isValidLink: isValidLink,
  isOwnLink: isOwnLink,
  prepareLink: prepareLink,
  issetLink: issetLink,
};

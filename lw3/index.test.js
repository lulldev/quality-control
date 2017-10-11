const linkCheckerCollection = require('./link-checker');

test('extract hostname', () => {
  expect(linkCheckerCollection.extractHostname('')).toBe('');
  expect(linkCheckerCollection.extractHostname('http://vk.com/')).toBe('vk.com');
  expect(linkCheckerCollection.extractHostname('https://site.ru/')).toBe('site.ru');
});

test('link validator', () => {
  expect(linkCheckerCollection.isValidLink('http://some.ru/')).toBeTruthy();
  expect(linkCheckerCollection.isValidLink('/')).toBeTruthy();
  expect(linkCheckerCollection.isValidLink('mailto:test@mail.ru')).toBeTruthy();
  expect(linkCheckerCollection.isValidLink('tel:89238928329')).toBeTruthy();
  expect(linkCheckerCollection.isValidLink('javascript:alert("some")')).toBeFalsy();
});

test('check is own link', () => {
  expect(linkCheckerCollection.isOwnLink('http://some.ru/', 'some.ru')).toBeTruthy();
  expect(linkCheckerCollection.isOwnLink('https://ok.ru/', 'ok.ru')).toBeTruthy();
  expect(linkCheckerCollection.isOwnLink('https://ok.ru/', 'test.ru')).toBeFalsy();
});

test('prepared link', () => {
  expect(linkCheckerCollection.prepareLink('http://some.ru/', 'somepath')).toBe('http://some.ru/');
  expect(linkCheckerCollection.prepareLink('some', 'test.ru')).toBe('http://test.ru/some');
});

test('isset link', () => {
  let links = [
    {link: 'http://borodin-av.ru/'},
    {link: 'http://vk.com/'}
  ];
  expect(linkCheckerCollection.issetLink('', links)).toBeFalsy();
  expect(linkCheckerCollection.issetLink('http://some.ru/', links)).toBeFalsy();
  // todo: crash this tests
  // expect(linkCheckerCollection.issetLink('http://vk.com/', links)).toBe(true);
  // expect(linkCheckerCollection.issetLink('http://borodin-av.ru/', links)).toBe(true);
});


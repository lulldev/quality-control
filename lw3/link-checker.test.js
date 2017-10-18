const linkCheckerCollection = require('./link-checker');

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

test('preparing link', () => {
  expect(linkCheckerCollection.prepareLink('http://some.ru/', 'somepath')).toBe('http://some.ru/');
  expect(linkCheckerCollection.prepareLink('some', 'test.ru')).toBe('http://test.ru/some');
});

test('isset link', () => {
  const links = [
    {link: 'http://borodin-av.ru/'},
    {link: 'http://vk.com/'}
  ];
  expect(linkCheckerCollection.issetLink('', links)).toBeFalsy();
  expect(linkCheckerCollection.issetLink('http://some.ru/', links)).toBeFalsy();
  expect(linkCheckerCollection.issetLink('http://vk.com/', links)).toBeTruthy();
  expect(linkCheckerCollection.issetLink('http://borodin-av.ru/', links)).toBeTruthy();
});

test('remove duplicates link', () => {
  expect(linkCheckerCollection.removeDuplicatesLinks([])).toEqual([]);
  expect(linkCheckerCollection.removeDuplicatesLinks([{link: 'http://borodin-av.ru/'}])).toEqual([{link: 'http://borodin-av.ru/'}]);

  const linksWithDuplicates = [
    {link: 'http://borodin-av.ru/'},
    {link: 'http://vk.com/'},
    {link: 'http://vk.com/'}
  ];

  const linksWithoutDuplicates = [
    {link: 'http://borodin-av.ru/'},
    {link: 'http://vk.com/'}
  ];

  const withoutDuplicates = linkCheckerCollection.removeDuplicatesLinks(linksWithDuplicates);
  expect(withoutDuplicates).toEqual(linksWithoutDuplicates);
});

test('link checker main program', () => {
  let allLinks = [];
  let linksArr = [];
  linkCheckerCollection.parseAndTestLinks('http://localhost:8080/');

  setTimeout(() => {
    console.log(allLinks);
  }, 10000);
  
});


const linkCheckerCollection = require('./index');

test('extract hostname', () => {
  expect(linkCheckerCollection.extractHostname('http://vk.com/')).toBe('vk.com');
});
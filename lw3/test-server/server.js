var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.sendfile('test-server/index.html');
});

app.get('/page1.html', function(req, res) {
  res.sendfile('test-server/page1.html');
});

app.listen(8080);
console.log('Тестовый сервер запущен');
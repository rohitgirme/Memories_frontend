/**
 * Created by rohitgirme on 10/9/15.
 */
var express = require('express'),
    path = require('path'),
    lessMiddleware = require('less-middleware'),
    fileRoot = path.join(__dirname, '../'),
    proxy = require('express-http-proxy');

var app = express();
var cache = path.join(__dirname, '/cache'),
    responseJSONCache;

app.use(lessMiddleware('/less', {
  dest: '/css',
  pathRoot: fileRoot,
  force: true
}));
// Used to server static files.
app.use(express.static(fileRoot));

app.get('/', function (req, res) {
  res.sendfile(path.join(fileRoot, 'index_dev.html'));
});

// This is MOCK data.
//app.get('/memories', function (req, res) {
//  console.log('memories', req.query);
//  if (req.query && req.query.action === 'top') {
//    responseJSONCache = path.join(cache, 'top.json');
//    res.sendFile(responseJSONCache);
//  }
//});

// Proxy all calls to Tomcat.
app.all('*', proxy('localhost', {
  port: 8080
}));

app.listen(8000, function () {
  console.log('App Started on 8000: ', fileRoot);
});

/**
 * Created by rohitgirme on 10/9/15.
 */
var express = require('express'),
    path = require('path'),
    lessMiddleware = require('less-middleware'),
    fileRoot = path.join(__dirname, '../');

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

app.get('/memories', function (req, res) {
  console.log('memories', req.query);
  if (req.query && req.query.action === 'top') {
    responseJSONCache = path.join(cache, 'top.json');
    res.sendFile(responseJSONCache);
  }

});


app.listen(3000, function () {
  console.log('App Started on 3000: ', fileRoot);
});

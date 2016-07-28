var express = require('express')
var app = express()

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var engines = require('consolidate')
var favicon = require('serve-favicon');

var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))


app.use("/public", express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname + '/public'));

app.set('views', './views')
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app
  .get('/', function (req, res) {
    res.redirect('/perfect');
  })
  .get('/favicon.ico', function (req, res) {
    res.end()
  })
  .get('/jadson', function (req, res) {
    res.render('jadson/index.html');
  })
  .get('/jadson/animation', function (req, res) {
    res.render('jadson/animation.html');
  })
  .get('/perfect', function (req, res) {
    res.render('perfect/index.html');
  })
  .get('/perfect/alpha', function (req, res) {
    res.render('perfect/alpha.html');
  })
  .get('/survey', function (req, res) {
    res.render('survey/index.html');
  });

var server = app.listen(port, function () {
  console.log('Server running at http://localhost:' + server.address().port);
});

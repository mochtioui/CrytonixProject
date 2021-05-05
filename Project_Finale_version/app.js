var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
const formidable = require('express-formidable');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


require('./config/database');

const bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var BlogRouter = require('./routes/Blog');
var themesRouter = require('./routes/theme');

var links_boxRouter = require('./routes/links_box');

var ProductTypeRouter = require('./routes/productType');
var websitesRouter = require('./routes/website');
var pagesRouter = require('./routes/page');
var ProductSubTypeRouter = require('./routes/productSubType');
var ProductPropertyRouter = require('./routes/productProperty');
var PropertyLabelRouter = require('./routes/propertyLabel');
var ProductRouter = require('./routes/product');
var layoutRouter = require('./routes/layout');
var ScraperRouter = require('./routes/scraper');
var TrackerRouter = require('./routes/tracking');

var Ads_bannerRouter = require('./routes/ads_banner');


var app = express();

app.use(cors());
app.use(bodyParser.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");

  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Blog', BlogRouter);
app.use('/theme', themesRouter);
app.use('/productType', ProductTypeRouter);
app.use('/website', websitesRouter);
app.use('/page', pagesRouter);
app.use('/layout', layoutRouter);
app.use('/productProperty', ProductPropertyRouter);
app.use('/productSubType', ProductSubTypeRouter);
app.use('/propertyLabel', PropertyLabelRouter);
app.use('/ads_banner', Ads_bannerRouter);
app.use('/links_box', links_boxRouter);

app.use('/product', ProductRouter);
app.use('/scraper', ScraperRouter);
app.use('/tracker', TrackerRouter);










// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

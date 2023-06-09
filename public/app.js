var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const mime = require('mime');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) =>{
  const mimeType = mime.getType(req.url);
  if(mimeType==='text/css') {
    res.setHeader('Content-Type', mimeType);
  }
    next();
});

app.get('/', function(req, res)  {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//app.get('/stylesheets/style.css', function(req, res) {
//  res.setHeader('Content-Type', mime.getType('style.css'));
//  res.sendFile(__dirname, 'public', );
//});

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
  res.send(err.message);
});

module.exports = app;

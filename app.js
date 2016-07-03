var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

const config=require('./config');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');
var oauth2 = require('./routes/oauth2');
var activity = require('./routes/activity');
var step = require('./routes/step');
var distance = require('./routes/distance');
var caloriesOut = require('./routes/caloriesOut');
const adminBoot=require('./boot/admin.boot');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'asdfgh',
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/oauth2',oauth2);
app.use('/activity',activity);
app.use('/step',step);
app.use('/distance',distance);
app.use('/caloriesOut',caloriesOut);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

//DB connection
mongoose.connect(config.dataSource);
let db = mongoose.connection;
db.on('error',console.error.bind(console,'mongodb connection error:'));
db.once('open', () => {
  console.log('[+] mongoose connected');
  adminBoot();
});



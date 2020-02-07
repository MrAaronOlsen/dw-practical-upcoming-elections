const createError = require('http-errors');
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// These are neat! Using helpers to persist state data in search form and format date in result.
const helpers = require('handlebars-helpers');
const compare_helpers = helpers.comparison();
const date_helpers = helpers.date();

const searchRoutes = require('./routes/search_routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts/'),
  partialsDir: [
    path.join( __dirname + '/views/partials/'),
    path.join( __dirname + '/views/partials/results/')
  ],
  helpers: {
    ...compare_helpers,
    ...date_helpers
  }
}))

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', searchRoutes);

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

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs  = require('express-handlebars');
const uuidv4 = require('uuid/v4');
const session = require('express-session');
const redis = require('redis');
const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);

const routes = require('./routes');

const app = express();

redisClient.on('error', (err) => {
  console.log('Error: ', err);
});

// Start a session; we use Redis for the store
app.use(session({
  secret: 'TeslaRocks',
  resave: false,
  saveUninitialized: true,
  store: new redisStore({ host: 'localhost', port: 6379, client: redisClient }),
}));

// View engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

// Reference modularized routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { err });
});

module.exports = app;

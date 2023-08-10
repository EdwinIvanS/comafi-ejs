var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://comafipanama.com/",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: false,
};
app.use(cors(corsOptions));

app.use('/', indexRouter);

// Ejecuta APP

app.listen(65002, () => {
  console.log("server on port 65002");
});

module.exports = app;

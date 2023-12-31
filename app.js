var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.use(express.static(path.join(__dirname, "public")));
//app.set('view engine', 'ejs');
app.engine("html", require("ejs").renderFile); 
app.set("view engine", "html");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://comafipanama.com", // Sin la barra al final
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: false,
};
app.use(cors(corsOptions));

// Manejo de errores - Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Configura la política de encabezado "Referrer-Policy"
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use('/', indexRouter);

// Ejecuta APP

app.listen(65002, () => {
  console.log("server on port 65002");
});

module.exports = app;

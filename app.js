const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require ("jsonwebtoken");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productosRouter = require('./routes/productos');
const bannersRouter = require('./routes/banners');
const categoriasRouter = require('./routes/categorias');

const app = express();

app.set("key", "123");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productos', productosRouter);
app.use('/banners', bannersRouter);
app.use('/categorias', categoriasRouter);

function verificarToken(req, res, next){
  const autorizar = req.headers["authorization"];
  if(!autorizar){
    return res.status(401).json({message: "No hay token"});
  }
  const token = autorizar.split(" ")[1]; 
  jwt.verify(token, req.app.get("key"), function(error, payload){
    if(error){
      return res.status(401).json({message: error.message});
    }else{
      console.log(payload);
      next();
    }
  });
}

app.verificarToken = verificarToken;

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
  res.json(err.message);
});

module.exports = app;

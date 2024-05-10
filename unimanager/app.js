const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');



//USER
const utilizador = require('./routes/utilizador');
app.get('/utilizador',utilizador.getutilizador)
app.post('/login',utilizador.login)
app.post('/registar',utilizador.createutilizador)
app.post('/delete',utilizador.userdelete)
app.post('/updateuser',utilizador.updateuser)
app.get('/favutilizadores',utilizador.getfavutilizadores)


//Estacionamento
const estacionamento = require("./routes/estacionamento");
app.get('/estacionamento/',estacionamento.getestacionamento)
app.post('/createest',estacionamento.createestacionamento)
app.get('/estacionamento/:id(\\d+)',estacionamento.getestacionamentobyid) //ainda nao funciona
app.post('/estdelete',estacionamento.estdelete)//nao testado


//Reserva
const reserva = require("./routes/reserva");
app.get('/reserva/',reserva.getreserva)
app.post('/createreserva',reserva.createreserva)
app.post('/reservadelete',reserva.reservadelete)






app.use('/', indexRouter);

module.exports = app;

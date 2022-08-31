const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cors = require("cors");
const cookies = require("cookie-parser")
const session = require("express-session")


const indexRouter = require('./src/routes/main');

const app = express();
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: true }));

//Aquí estoy disponiendo la posibilidad para utilizar el seteo en los formularios para el usod e los metodos put ó delete
app.use(methodOverride('_method'));

app.use(express.json());


app.use('/', indexRouter);
const puerto = 3001
app.listen(process.env.PORT || puerto, ()=>console.log("Servidor corriendo en el puerto ---> " + puerto))

// app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));




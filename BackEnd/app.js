const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cors = require("cors");


const indexRouter = require('./src/routes/main');

const app = express();
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions)) 

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.use(express.json());


app.use('/', indexRouter);
const puerto = 3001
app.listen(process.env.PORT || puerto, ()=>console.log("Servidor corriendo en el puerto ---> " + puerto))





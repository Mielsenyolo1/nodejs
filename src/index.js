const express = require('express')
const app = express();
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql')
const myConnection = require('express-myconnection')

//importando rutas
const customerRoutes= require('./routes/customer.js')




//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'))

// fuciones antes de peticiones el servidor middlewares
app.use(morgan('dev'));

//conexion base de datos
app.use(myConnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'prueba'
},'single'));

//conversion de datos de formulario a base de datos
app.use(express.urlencoded({extended: false}));




// routes rutas

app.use('/',customerRoutes)

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));




//iniciando servidor 
app.listen(3000, ()=> {
    console.log("servidor escuchando por el puerto 3000 ")
});
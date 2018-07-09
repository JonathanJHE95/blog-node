
const express = require('express');
const bodyParser = require('body-parser');

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin','*')
    next();
})

app.get('/', (req, res) => {
    res.json({
        "Bienvenido": "Aqui podras crear articulos"
    });
});

require('./app/routes/articulo.routes.js')(app);

require('./app/routes/comentario.routes.js')(app);

// puerto del servidor
app.listen(3000, () => {
    console.log("Servidor ejecutandose por el puerto 3000");
});

mongoose.Promise = global.Promise;

// coneccion a la base de datos
mongoose.connect(dbConfig.url, { useNewUrlParser:true })
    .then(() => {
        console.log('Conexion exitosa a la db')
    }).catch(err => {
        console.log('Fallo la conexion a la db')
        process.exit();
    });
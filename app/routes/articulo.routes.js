
module.exports = (app) => {
    
    const articulos = require('../controllers/articulo.controller.js');

    // crear un articulo
    app.post('/articulos', articulos.create);

    // mostrar todos los articulos
    app.get('/articulos', articulos.findAll);

    // mostrar solo un articulo
    app.get('/articulos/:artId', articulos.findOne);

    // actualizar articulo
    app.put('/articulos/:artId', articulos.update);

    // eliminar articulo
    app.delete('/articulos/:artId', articulos.delete);

    
}
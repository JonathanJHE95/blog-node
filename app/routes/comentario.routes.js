
module.exports = (app) => {
    
    const comentarios = require('../controllers/comentario.controller.js');

    // crear un comentario
    app.post('/comentarios', comentarios.create);

    // mostrar todos los comentarios
    app.get('/comentarios', comentarios.findAll);

    // mostrar solo un comentario
    app.get('/comentarios/:comId', comentarios.findOne);

    // actualizar comentario
    app.put('/comentarios/:comId', comentarios.update);

    // eliminar comentario
    app.delete('/comentarios/:comId', comentarios.delete);
}
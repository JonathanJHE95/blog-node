
const Comentario = require('../models/comentario.model.js');

const Articulo = require('../models/articulo.model.js');

// Crear un comentario
exports.create = (req, res) => {
    
    if (!req.body.mensaje) {
        return res.status(400).send({
            message: 'El comentario no puede venir sin una mensaje'
        });
    }

    const comentario = new Comentario({
        remitente: req.body.remitente || 'Soy un comentario',
        mensaje: req.body.mensaje,
        articuloid: req.body.articuloid
    });

    comentario.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Ocurrio un error durante la creacion del comentario'
        });
    });
};

// Mostrar todos los comentarios
exports.findAll = (req, res) => {
//    Comentario.find()
    Comentario.find({}, (error, articulo) => {
        Articulo.populate(articulo, {
            path: "articuloid"
        }, (error, comentarios) => {
            res.send(comentarios);
        })
/*    })
    .then(comentarios => {
        res.send(comentarios);*/
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Ocurrio un error al mostrar los comentarios'
        })
    })
};

// Mostrar solo un comentario
exports.findOne = (req, res) => {
    Comentario.findById(req.params.comId)
    .then(comentario => {
        if (!comentario) {
            return res.status(404).send({
                message: 'No se encontro el comentario con el id: ' + req.params.comId
            });
        }
        res.send(comentario);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'No se encontro el comentario con el id: ' + req.params.comId
            });
        }
        return res.status(500).send({
            message: 'Error al obtener el comentario con id: ' + req.params.comId
        });
    });
};

// Actualizar comentario
exports.update = (req, res) => {
    if (!req.body.mensaje) {
        return res.status(400).send({
            message: 'El comentario no puede venir sin una mensaje'
        });
    }

    Comentario.findByIdAndUpdate(req.params.comId, {
        remitente: req.body.remitente || 'Soy un comentario',
        mensaje: req.body.mensaje,
        articuloid: req.body.articuloid
    }, {new: true})
    .then(comentario => {
        if (!comentario) {
            return res.status(404).send({
                message: 'No se encontro el comentario con el id: ' + req.params.comId
            });
        }
        res.send(comentario);        
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'No se encontro el comentario con el id: ' + req.params.comId
            });
        }
        return res.status(500).send({
            message: 'Error al actualizar el comentario con id: ' + req.params.comId
        });
    });
};

// Eliminar un comentario
exports.delete = (req, res) => {
    Comentario.findByIdAndRemove(req.params.comId)
    .then(comentario => {
        if (!comentario) {
            return res.status(404).send({
                message: 'No se encontro el comentario con el id: ' + req.params.comId
            });
        }
        res.send({
            message: 'Comentario eliminado exitosamente'
        });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: 'No se encontro el comentario con el id: ' + req.params.comId
            });
        }
        return res.status(500).send({
            message: 'Error al eliminar el comentario con id: ' + req.params.comId
        });
    });
};
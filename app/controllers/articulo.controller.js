
const Articulo = require('../models/articulo.model.js');

// Crear un articulo
exports.create = (req, res) => {
    
    if (!req.body.descripcion) {
        return res.status(400).send({
            message: 'El articulo no puede venir sin una descripcion'
        });
    }

    const articulo = new Articulo({
        titulo: req.body.titulo || 'Soy un articulo',
        descripcion: req.body.descripcion
    });

    articulo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Ocurrio un error durante la creacion del articulo'
        });
    });
};

// Mostrar todos los articulos
exports.findAll = (req, res) => {
    Articulo.find()
    .then(articulos => {
        res.send(articulos);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Ocurrio un error al mostrar los articulos'
        })
    })
};

// Mostrar solo un articulo
exports.findOne = (req, res) => {
    Articulo.findById(req.params.artId)
    .then(articulo => {
        if (!articulo) {
            return res.status(404).send({
                message: 'No se encontro el articulo con el id: ' + req.params.artId
            });
        }
        res.send(articulo);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'No se encontro el articulo con el id: ' + req.params.artId
            });
        }
        return res.status(500).send({
            message: 'Error al obtener el articulo con id: ' + req.params.artId
        });
    });
};

// Actualizar articulo
exports.update = (req, res) => {
    if (!req.body.descripcion) {
        return res.status(400).send({
            message: 'El articulo no puede venir sin una descripcion'
        });
    }

    Articulo.findByIdAndUpdate(req.params.artId, {
        titulo: req.body.titulo || 'Soy un articulo',
        descripcion: req.body.descripcion
    }, {new: true})
    .then(articulo => {
        if (!articulo) {
            return res.status(404).send({
                message: 'No se encontro el articulo con el id: ' + req.params.artId
            });
        }
        res.send(articulo);        
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'No se encontro el articulo con el id: ' + req.params.artId
            });
        }
        return res.status(500).send({
            message: 'Error al actualizar el articulo con id: ' + req.params.artId
        });
    });
};

// Eliminar un articulo
exports.delete = (req, res) => {
    Articulo.findByIdAndRemove(req.params.artId)
    .then(articulo => {
        if (!articulo) {
            return res.status(404).send({
                message: 'No se encontro el articulo con el id: ' + req.params.artId
            });
        }
        res.send({
            message: 'Articulo eliminado exitosamente'
        });
    }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: 'No se encontro el articulo con el id: ' + req.params.artId
            });
        }
        return res.status(500).send({
            message: 'Error al eliminar el articulo con id: ' + req.params.artId
        });
    });
};
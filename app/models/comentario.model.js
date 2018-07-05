const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Articulo = mongoose.model('Articulo')

/* Modelo 1
const ComentarioSchema = mongoose.Schema({
    remitente: String,
    mensaje: String,
    articuloid: String
}, {
    timestamps: true
}); */

// Modelo 2
const ComentarioSchema = new Schema({
    remitente: String,
    mensaje: String,
    articuloid: {
        type: Schema.ObjectId,
        ref: "Articulo"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Comentario', ComentarioSchema);
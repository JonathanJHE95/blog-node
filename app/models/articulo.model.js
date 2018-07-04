
const mongoose = require('mongoose');

const ArticuloSchema = mongoose.Schema({
    titulo: String,
    descripcion: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Articulo', ArticuloSchema);
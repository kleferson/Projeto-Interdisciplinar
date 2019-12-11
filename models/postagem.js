const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Postagem = new Schema({
    autor: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('postagens', Postagem)
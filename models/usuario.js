const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema({
    login: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model('usuarios', Usuario)
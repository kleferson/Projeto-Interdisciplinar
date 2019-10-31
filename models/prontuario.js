const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Prontuario = new Schema({
    nome:{
        type: String,
        required: true
    },
    endereco:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model('prontuarios', Prontuario)
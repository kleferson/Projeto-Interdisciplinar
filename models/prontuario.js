const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Prontuario = new Schema({
    date:{type:Date, default:Date.now()},
    nome:{type:String, required: true},
    data_nasc:{type:Date, required: true},
    ocupacao:{ type:String},
    email:{type: String},    
    telefone:{type:Number},
    sexo:{type:String},
    escolaridade:{type:String},    
    observacoes:{type:String },
    cep:{type:Number},   
    endereco:{type:String},
    numero:{type:String},
    complemento:{type:String},   
    bairro:{type:String}, 
    cidade:{type:String},
    estado:{type:String},
    pais:{type:String},    
    limitacao:{type:String},
    alergia:{type:String}, 
    motivo_atendimento:{type:String},
    pa:{type:Number},
    fc:{type:Number},
    fr:{type:Number},
    t:{ type:Number},
    doencas_cronicas:{type:String},
    queixa_momento:{type:String},
    anamnese:{type:String},
    exame_fisico:{type:String},
    aluno:{type:String, required: true},
})

mongoose.model('prontuarios', Prontuario)
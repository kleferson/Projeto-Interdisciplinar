const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/usuario")
require("../models/prontuario")
const usuario = mongoose.model("usuarios")
const prontuario = mongoose.model("prontuarios")

//rotas
router.get('/',(req,res)=>{
    res.render('usuario/index')
})

router.get('/login', (req,res)=>{
    res.render('usuario/login')
})

//rota de cadastro de usuarios
router.get('/login/cadastrar-usuario',(req,res)=>{
    res.render('usuario/adduser')
})

router.post('/login/cadastrar-usuario/newuser',(req,res)=>{
    var erros = []
    if(!req.body.login || typeof req.body.login == undefined || req.body.login == null){
        erros.push({texto: 'Login invalido!'})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: 'Senha Invalida!'})
    }

    if(req.body.senha.length < 8){
        erros.push({texto: 'A senha deve ter no minimo 8 digitos'})
    }
    
    if(erros.length > 0){
        res.render('usuario/adduser', {erros: erros})
    }else{
        const novoUsuario ={
            login: req.body.login,
            senha: req.body.senha
        }
        //criando o schema no banco
        new usuario(novoUsuario).save().then(()=>{
            req.flash('success_msg', 'Usuario cadastrado com sucesso!')
            res.redirect('/login')
        }).catch((erro)=>{
            req.flash('error_msg', 'Houve um erro, Tente Novamente!')
            console.log('Erro: '+erro)
        })
    }  
})

//rota de cadastro de prontuarios
router.get('/cadastrar-prontuario', (req,res)=>{
    res.render('usuario/addprontuario')
})

router.post('/cadastrar-prontuario/new-prontuario', (req,res)=>{
    const novoProntuario ={
        nome: req.body.nome,
        endereco: req.body.endereco
    }
    //criando o schema no banco
    new prontuario(novoProntuario).save().then(()=>{
        req.flash('success_msg', 'Prontuario cadastrado com sucesso!')
        res.redirect('/')
    }).catch((erro)=>{
        req.flash('error_msg', 'Houve um erro, Tente Novamente!')
        console.log('Erro: '+erro)
    })
})

//rota de visualização de usuarios
router.get('/showuser', (req,res)=>{
    usuario.find().sort({date: 'desc'}).then((usuarios) =>{
        res.render('usuario/showuser', {usuarios: usuarios})
    }).catch((erro)=>{
        req.flash('error_msg', 'Houve um erro ao listar os usuarios')
        res.redirect('/')
    })
})

//rota de visualização de prontuarios
router.get('/showprontuarios', (req,res)=>{
    prontuario.find().sort({date: 'desc'}).then((prontuarios)=>{
        res.render('usuario/showprontuarios', {prontuarios: prontuarios})
    }).catch((erro)=>{
        req.flash('error_msg','Houve um erro ao listar os prontuarios')
        res.redirect('/')
    })
})

module.exports = router


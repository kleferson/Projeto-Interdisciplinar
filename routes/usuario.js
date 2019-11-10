const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/usuario")
require("../models/prontuario")
const Usuario = mongoose.model("usuarios")
const prontuario = mongoose.model("prontuarios")
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { eUser } = require('../helpers/eUser')

//rotas
router.get('/', (req, res) => {
    res.render('usuario/index')
})

//validando cadastro
router.post('/login/cadastrar-usuario/newuser', (req, res) => {
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'Login invalido!' })
    }

    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: 'Senha Invalida!' })
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: 'Insira um Email!' })
    }

    if (req.body.senha.length < 8) {
        erros.push({ texto: 'A senha deve ter no minimo 8 digitos' })
    }

    if (erros.length > 0) {
        res.render('usuario/adduser', { erros: erros })
    } else {
        Usuario.findOne({ email: req.body.email }).then((usuario) => {
            if (usuario) {
                req.flash('error_msg', 'Já Existe um usuário cadastrado com esse Email!')
                res.redirect('/login/cadastrar-usuario')
            } else {
                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha
                })

                bcrypt.genSalt(10,(erro,salt)=>{
                    bcrypt.hash(novoUsuario.senha, salt, (erro,hash)=>{
                        if(erro){
                            req.flash('error_msg', 'Houve um erro no salvamento')
                            res.redirect('/login/cadastrar-usuario')
                        }

                        novoUsuario.senha = hash

                        new Usuario(novoUsuario).save().then(() => {
                            req.flash('success_msg', 'Usuario cadastrado com sucesso!')
                            res.redirect('/login')
                        }).catch((erro) => {
                            req.flash('error_msg', 'Houve um erro, Tente Novamente!')
                            console.log('Erro: ' + erro)
                        })

                    })
                })

            }
        })


    }
})

//rota de cadastro de prontuarios
router.get('/cadastrar-prontuario', eUser, (req, res) => {
    res.render('usuario/addprontuario')
})

//validando cadastro
router.post('/cadastrar-prontuario/new-prontuario', (req, res) => {
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'Nome Vazio!' })
    }

    if (!req.body.endereco || typeof req.body.endereco == undefined || req.body.endereco == null) {
        erros.push({ texto: 'Endereço Vazio!' })
    }

    if (erros.length > 0) {
        res.render('usuario/addprontuario', { erros: erros })
    } else {

        const novoProntuario = {
            nome: req.body.nome,
            endereco: req.body.endereco
        }
        //criando o schema no banco
        new prontuario(novoProntuario).save().then(() => {
            req.flash('success_msg', 'Prontuario cadastrado com sucesso!')
            res.redirect('/cadastrar-prontuario')
        })
    }

})

//rota de visualização para impressão
router.get('/showprontuarios/view/:id', eUser, (req, res) => {
    prontuario.findOne({ _id: req.params.id }).then((prontuario) => {
        res.render('usuario/view', { prontuario: prontuario })
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro em visualizar o prontuário')
        res.redirect('/')
    })
})

//rota de visualização de prontuarios cadastrados
router.get('/showprontuarios', eUser, (req, res) => {
    prontuario.find().sort({ date: 'desc' }).then((prontuarios) => {
        res.render('usuario/showprontuarios', { prontuarios: prontuarios })
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao listar os prontuarios')
        res.redirect('/')
    })
})

//Editando prontuario
router.get('/showprontuarios/edit/:id', eUser, (req, res) => {
    prontuario.findOne({ _id: req.params.id }).then((prontuario) => {
        res.render('usuario/edit', { prontuario: prontuario })
    }).catch((erro) => {
        req.flash('error_msg', 'Este prontuário não existe')
        res.redirect('/showprontuarios')
    })

})

router.post('/showprontuarios/edit', (req, res) => {
    prontuario.findOne({ _id: req.body.id }).then((prontuario) => {
        prontuario.nome = req.body.nome
        prontuario.endereco = req.body.endereco
        prontuario.save().then(() => {
            req.flash('success_msg', 'Prontuário editado com sucesso!')
            res.redirect('/showprontuarios')
        })
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao editar prontuário')
        res.redirect('/showprontuarios')
    })
})

//Deletando prontuario
router.post('/showprontuarios/delete', (req, res) => {
    prontuario.remove({ _id: req.body.id }).then(() => {
        req.flash('success_msg', 'Prontuário deletado com sucesso!')
        res.redirect('/showprontuarios')
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao deletar o prontuario')
        res.redirect('/showprontuarios')
    })
})

//rota de login
router.get('/login', (req, res) => {
    res.render('usuario/login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', 'Deslogado com sucesso')
    res.redirect('/')
})

//rota de cadastro de usuarios
router.get('/login/cadastrar-usuario', (req, res) => {
    res.render('usuario/adduser')
})
module.exports = router


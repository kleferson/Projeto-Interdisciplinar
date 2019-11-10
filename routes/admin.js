const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/usuario")
require("../models/prontuario")
const Usuario = mongoose.model("usuarios")
const prontuario = mongoose.model("prontuarios")
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { eAdmin } = require('../helpers/eAdmin')

router.get('/', eAdmin, (req, res) => {
    prontuario.find().sort({ date: 'desc' }).then((prontuarios) => {
        res.render('admin/paineladmin', { prontuarios: prontuarios })
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao listar os prontuarios')
        res.redirect('/')
    })
})

//rota de visualização de usuarios
router.get('/showuser', eAdmin, (req, res) => {
    Usuario.find().sort({ date: 'desc' }).then((usuarios) => {
        res.render('admin/showuser', { usuarios: usuarios })
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao listar os usuarios')
        res.redirect('/')
    })
})

//rota de edição de usuarios
router.get('/showuser/edit/:id', eAdmin, (req, res) => {
    Usuario.findOne({ _id: req.params.id }).then((usuarios) => {
        res.render('admin/edit', { usuarios: usuarios })
    }).catch((erro) => {
        req.flash('error_msg', 'Este prontuário não existe')
        res.redirect('/admin/')
    })

})

router.post('/showuser/edit', (req, res) => {
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'É necessario um nome!' })
    }

    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: 'Senha Vazia!' })
    }

    if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({ texto: 'É necessário um email!' })
    }

    if (req.body.senha.length < 8) {
        erros.push({ texto: 'A senha deve ter no minimo 8 digitos' })
    }

    if (erros.length > 0) {
        res.render('admin/edit', { erros: erros })
    } else {
        Usuario.findOne({ _id: req.body.id }).then((usuario) => {

            bcrypt.genSalt(10, (erro, salt) => {
                bcrypt.hash(req.body.senha, salt, (erro, hash) => {

                    req.body.senha = hash

                    usuario.senha = req.body.senha
                    usuario.nome = req.body.nome
                    usuario.email = req.body.email

                    usuario.save().then(() => {
                        req.flash('success_msg', 'Usuario cadastrado com sucesso!')
                        res.redirect('/admin/showuser')
                    }).catch((erro) => {
                        req.flash('error_msg', 'Houve um erro, Tente Novamente!')
                        console.log('Erro: ' + erro)
                    })

                })
            })
        }).catch((erro) => {
            req.flash('error_msg', 'Houve um erro ao editar dados do usuário')
            res.redirect('/admin/showuser')
        })
    }

})

router.post('/showuser/delete', (req, res) => {
    Usuario.remove({ _id: req.body.id }).then(() => {
        req.flash('success_msg', 'Usuário deletado com sucesso!')
        res.redirect('/admin/showuser')
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao deletar o prontuario')
        res.redirect('/admin/showuser')
    })
})


module.exports = router
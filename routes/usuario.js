const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/usuario")
require("../models/prontuario")
require("../models/postagem")
const Usuario = mongoose.model("usuarios")
const prontuario = mongoose.model("prontuarios")
const postagem = mongoose.model("postagens")
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { eUser } = require('../helpers/eUser')

//rotas
router.get('/', eUser, (req, res) => {
    postagem.find().sort({ date: 'desc' }).then((postagens) => {
        res.render('usuario/index', { postagens: postagens })
    })
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

    if (erros.length > 0) {
        res.render('usuario/addprontuario', { erros: erros })
    } else {
        const novoProntuario = {
            data_abertura: req.body.exibeDataAtual,
            cpf: req.body.cpf,
            nome: req.body.nome,
            data_nasc: req.body.data_nasc,
            ocupacao: req.body.ocupacao,
            email: req.body.email,
            telefone: req.body.telefone,
            sexo: req.body.sexo,
            escolaridade: req.body.escolaridade,
            observacoes: req.body.observacoes,
            cep: req.body.cep,
            endereco: req.body.endereco,
            numero: req.body.numero,
            complemento: req.body.complemento,
            bairro: req.body.bairro,
            cidade: req.body.cidade,
            estado: req.body.estado,
            pais: req.body.pais,
            limitacao: req.body.limitacao,
            alergia: req.body.alergia,
            motivo_atendimento: req.body.motivo_atendimento,
            pa: req.body.pa,
            fc: req.body.fc,
            fr: req.body.fr,
            t: req.body.t,
            doencas_cronicas: req.body.doencas_cronicas,
            queixa_momento: req.body.queixa_momento,
            anamnese: req.body.anamnese,
            exame_fisico: req.body.exame_fisico,
            aluno: req.body.aluno,
        }
        //criando o schema no banco
        new prontuario(novoProntuario).save().then(() => {
            req.flash('success_msg', 'Prontuario cadastrado com sucesso!')
            res.redirect('/cadastrar-prontuario')
        })
    }

})

//rota de cadastro de postagens
router.post('/newpost', (req, res) => {
    var erros = []

    if (!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null) {
        erros.push({ texto: 'Preencha o campo pra publicar uma postagem!' })
    }

    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({ texto: 'Titulo Vazio!' })
    }

    if (erros.length > 0) {
        res.render('usuario/index', { erros: erros })
    } else {
        const novaPostagem = {
            autor: req.body.autor,
            titulo: req.body.titulo,
            conteudo: req.body.conteudo
        }

        new postagem(novaPostagem).save().then(() => {
            req.flash('sucess_msg', 'Postagem Publicada com sucesso!')
            res.redirect('/')
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
        console.log(erro)
    })

})

router.post('/showprontuarios/edit', (req, res) => {
    prontuario.findOne({ _id: req.body.id }).then((prontuario) => {
        prontuario.anamnese = req.body.anamnese,
            prontuario.exame_fisico = req.body.exame_fisico
        prontuario.save().then(() => {
            req.flash('success_msg', 'Prontuário editado com sucesso!')
            res.redirect('/showprontuarios')
        })
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao editar prontuário')
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
    res.redirect('/login')
})


module.exports = router
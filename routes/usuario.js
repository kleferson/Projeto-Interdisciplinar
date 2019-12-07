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

//validando cadastro
router.post('/login/cadastrar-usuario/newuser', (req, res) => {
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'Login invalido!' })
    }

    if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({ texto: 'Senha Invalida!' })
    }

    if (req.body.senha != req.body.senha2) {
        erros.push({ texto: 'Senhas não conferem!' })
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

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if (erro) {
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

    if (erros.length > 0) {
        res.render('usuario/addprontuario', { erros: erros })
    } else {
        const novoProntuario = {
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

router.post('/newpost', (req, res) => {
    const novaPostagem = {
        autor: req.body.autor,
        conteudo: req.body.conteudo
    }

    new postagem(novaPostagem).save().then(() => {
        req.flash('sucess_msg', 'Postagem Publicada com sucesso!')
        res.redirect('/')
    })
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
        prontuario.anamnese = req.body.anamnese
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

//rota de cadastro de usuarios
router.get('/login/cadastrar-usuario', (req, res) => {
    res.render('usuario/adduser')
})
module.exports = router
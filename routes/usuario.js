const express = require('express')
const router = express.Router()
require("../models/usuario")
require("../models/prontuario")
require("../models/postagem")
const { eUser } = require('../helpers/eUser')
const LoginController = require('../controllers/LoginController')
const IndexController = require('../controllers/IndexController')
const ProntuarioController = require('../controllers/ProntuarioController')
const PostagemController = require('../controllers/admin/PostagemController')

//rotas
router.get('/', eUser, IndexController.index)

//rota de cadastro de prontuarios
router.get('/cadastrar-prontuario', eUser, ProntuarioController.form)

//validando cadastro
router.post('/cadastrar-prontuario/new-prontuario', eUser, ProntuarioController.create)

//rota de cadastro de postagens
router.post('/newpost', PostagemController.create)

//rota de visualização para impressão
router.get('/showprontuarios/view/:id', eUser, ProntuarioController.print)

//rota de visualização de prontuarios cadastrados
router.get('/showprontuarios', eUser, ProntuarioController.show)

//Editando prontuario
router.get('/showprontuarios/edit/:id', eUser, ProntuarioController.search_edit)

router.post('/showprontuarios/edit', ProntuarioController.edit)

//rota de login
router.get('/login', LoginController.login)
router.post('/login', LoginController.authentication)

//rota de logout
router.get('/logout', LoginController.logout)


module.exports = router
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/usuario")
require("../models/prontuario")
const { eAdmin } = require('../helpers/eAdmin')
const PainelAdminController = require('../controllers/PainelAdminController')
const UserController = require('../controllers/UserController')

router.get('/', eAdmin, PainelAdminController.index)

router.get('/cadastrar-prontuario', eAdmin, PainelAdminController.form)
//validando cadastro
router.post('/cadastrar-prontuario/new-prontuario', eAdmin, PainelAdminController.create)

//Editar Prontuário
router.get('/showprontuarios/edit/:id', eAdmin, PainelAdminController.search_edit)

router.post('/showprontuarios/edit', PainelAdminController.edit)

//Deletar Prontuário
router.post('/showprontuarios/delete', PainelAdminController.delete)

//rota de visualização de usuarios
router.get('/showuser', eAdmin, UserController.show)

//rota de edição de usuarios
router.get('/showuser/edit/:id', eAdmin, UserController.search_edit)

router.post('/showuser/edit', UserController.edit)

router.post('/showuser/delete', UserController.delete)

//rota de cadastro de usuarios
router.get('/cadastrar-usuario', eAdmin, UserController.form)

//validando cadastro
router.post('/cadastrar-usuario/newuser', UserController.create)


module.exports = router
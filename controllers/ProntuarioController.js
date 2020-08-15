const mongoose = require('mongoose')
const prontuario = mongoose.model("prontuarios")

module.exports = {
    create(req, res) {
        var erros = []
        if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
            erros.push({ texto: 'Nome Vazio!' })
        }

        if (erros.length > 0) {
            req.flash('error_msg', 'Houve um erro ao cadastrar o prontuário!')
            res.redirect('/cadastrar-prontuario')
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
                outrasLimitacoes: req.body.outrasLimitacoes,
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

    },

    search_edit(req, res) {
        prontuario.findOne({ _id: req.params.id }).then((prontuario) => {
            res.render('usuario/edit', { prontuario: prontuario })
        }).catch((erro) => {
            req.flash('error_msg', 'Este prontuário não existe')
            res.redirect('/showprontuarios')
            console.log(erro)
        })

    },

    edit(req, res) {
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
    },

    form(req, res) {
        res.render('usuario/addprontuario')
    },

    show(req, res) {
        prontuario.find().sort({ '_id': -1 }).then((prontuarios) => {
            res.render('usuario/showprontuarios', { prontuarios: prontuarios })
        }).catch((erro) => {
            req.flash('error_msg', 'Houve um erro ao listar os prontuarios')
            res.redirect('/')
        })
    },

    print(req, res) {
        prontuario.findOne({ _id: req.params.id }).then((prontuario) => {
            res.render('usuario/view', { prontuario: prontuario })
        }).catch((erro) => {
            req.flash('error_msg', 'Houve um erro em visualizar o prontuário')
            res.redirect('/')
        })
    }

}
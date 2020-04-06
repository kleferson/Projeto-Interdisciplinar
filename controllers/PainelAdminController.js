const mongoose = require('mongoose');
const prontuario = mongoose.model("prontuarios");

module.exports = {
    index(req, res) {
        prontuario.find().sort({ date: 'desc' }).then((prontuarios) => {
            res.render('admin/paineladmin', { prontuarios: prontuarios })
        }).catch((erro) => {
            req.flash('error_msg', 'Houve um erro ao listar os prontuarios')
            res.redirect('/')
        })
    },

    create(req, res) {
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

    form(req, res) {
        res.render('admin/addprontuario')
    },

    search_edit(req, res) {
        prontuario.findOne({ _id: req.params.id }).then((prontuario) => {
            res.render('admin/edit', { prontuario: prontuario })
        }).catch((erro) => {
            req.flash('error_msg', 'Este prontuário não existe')
            res.redirect('/showprontuarios')
        })

    },

    edit(req, res) {
        prontuario.findOne({ _id: req.body.id }).then((prontuario) => {
            prontuario.cpf = req.body.cpf,
                prontuario.nome = req.body.nome,
                prontuario.data_nasc = req.body.data_nasc,
                prontuario.ocupacao = req.body.ocupacao,
                prontuario.email = req.body.email,
                prontuario.telefone = req.body.telefone,
                prontuario.sexo = req.body.sexo,
                prontuario.escolaridade = req.body.escolaridade,
                prontuario.observacoes = req.body.observacoes,
                prontuario.cep = req.body.cep,
                prontuario.endereco = req.body.endereco,
                prontuario.numero = req.body.numero,
                prontuario.complemento = req.body.complemento,
                prontuario.bairro = req.body.bairro,
                prontuario.cidade = req.body.cidade,
                prontuario.estado = req.body.estado,
                prontuario.pais = req.body.pais,
                prontuario.limitacao = req.body.limitacao,
                prontuario.alergia = req.body.alergia,
                prontuario.motivo_atendimento = req.body.motivo_atendimento,
                prontuario.pa = req.body.pa,
                prontuario.fc = req.body.fc,
                prontuario.fr = req.body.fr,
                prontuario.t = req.body.t,
                prontuario.doencas_cronicas = req.body.doencas_cronicas,
                prontuario.queixa_momento = req.body.queixa_momento,
                prontuario.anamnese = req.body.anamnese,
                prontuario.exame_fisico = req.body.exame_fisico
            prontuario.save().then(() => {
                req.flash('success_msg', 'Prontuário editado com sucesso!')
                res.redirect('/admin')
            })
        }).catch((erro) => {
            req.flash('error_msg', 'Houve um erro ao editar prontuário')
            res.redirect('/admin')
        })
    },

    delete(req, res) {
        prontuario.remove({ _id: req.body.id }).then(() => {
            req.flash('success_msg', 'Prontuário deletado com sucesso!')
            res.redirect('/admin')
        }).catch((erro) => {
            req.flash('error_msg', 'Houve um erro ao deletar o prontuario')
            res.redirect('/admin')
        })
    },

}
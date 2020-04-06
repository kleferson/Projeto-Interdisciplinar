const mongoose = require('mongoose')
const postagem = mongoose.model("postagens")

module.exports = {
    create(req, res) {
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

    }

}
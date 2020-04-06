const mongoose = require('mongoose');
const postagem = mongoose.model("postagens");

module.exports = {
    index(req, res) {
        postagem.find().sort({ date: 'desc' }).then((postagens) => {
            res.render('usuario/index', { postagens: postagens })
        })
    }
}
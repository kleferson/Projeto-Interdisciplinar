const mongoose = require('mongoose');
const prontuario = mongoose.model("prontuarios");

module.exports = {
    index(req, res) {
        prontuario.find().sort({'_id': -1 }).limit(5).then((prontuarios) => {
            res.render('usuario/index', { prontuarios: prontuarios })  
        });
    },
}
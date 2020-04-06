const passport = require('passport')

module.exports = {
    login(req, res) {
        res.render('usuario/login')
    },

    authentication(req, res, next) {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: "/login",
            failureFlash: true
        })(req, res, next)
    },

    logout(req, res) {
        req.logout()
        req.flash('success_msg', 'Deslogado com sucesso')
        res.redirect('/login')
    }
};
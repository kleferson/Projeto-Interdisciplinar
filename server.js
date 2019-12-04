const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();
const admin = require("./routes/admin")
const usuario = require("./routes/usuario")
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require("./config/auth")(passport)
require("./models/usuario")
require("./models/prontuario")

//config Sessão
app.use(session({
    secret: "projeto",
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//MiddleWare
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

//config Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//config handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://kleferson:Gt1A82wif9kmcbas@prontuarioapp-0it5t.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true }).then(() => {
    console.log('MongoDB started')
}).catch((erro) => {
    console.log('Erro: ' + erro)
})

//Public
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
    next()
})

//rotas
app.use('/admin', admin)
app.use('/', usuario)


//localhost
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('Servidor Rodando em: 127.0.0.1:' + port)
})


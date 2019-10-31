const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();
const admin = require("./routes/admin")
const usuario =require("./routes/usuario")
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

//config Sessão
app.use(session({
    secret: "projeto",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

//MiddleWare
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})

//config Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//config handlebars
app.engine('handlebars', handlebars({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//Mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/app",{ useNewUrlParser: true } ).then(()=>{
    console.log('MongoDB started')
}).catch((erro)=>{
    console.log('Erro: '+erro)
})

//Public
app.use(express.static(path.join(__dirname,'public')))
app.use((req,res,next)=>{
    console.log('OI eu SOu o MIddleWAre!')
    next()
})

//rotas
app.use('/admin', admin)
app.use('/', usuario)


//localhost
const port = 8000
app.listen(port,()=>{
    console.log('Servidor Rodando em: 127.0.0.1:' +port)
})


module.exports ={
    eUser:(req,res,next)=>{
        if(req.isAuthenticated()){
            return next()
        }
        
        req.flash('error_msg', 'Faça login para continuar!')
        res.redirect('/login')
    },
}
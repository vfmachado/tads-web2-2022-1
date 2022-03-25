//AUTENTICAÇÃO - GARANTINDO QUE O USUÁRIO EXISTE NA SESSION
const isAuth = (req, res, next) => {
    if (req.session?.user) return next();
    return res.redirect('/login.html');
}

module.exports = { isAuth };
const { findAll } = require("../data/db");

class LoginController {

    async login(req, res) {
        const { email, senha } = req.body;
        const users = findAll();
        
        console.log({users})
        
        const user = users.find(u => u.email == email && u.senha == senha)
        
        console.log({ user })

        if (user) {
            req.session.user = user;
            return res.send('Login sucesso');
        
        }
        else 
            return res.redirect('/login.html');
    }

}

module.exports = { LoginController }
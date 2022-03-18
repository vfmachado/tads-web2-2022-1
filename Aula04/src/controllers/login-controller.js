const { getConnection } = require("../data/database");
const { findAll } = require("../data/memory-db");

class LoginController {

    async login(req, res) {
        const { email, password } = req.body;
        
        const con = await getConnection();
        const result = await con.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password])
        // const users = findAll();
    
        const user = result.rows[0];
        console.log({user})
        
        // const user = users.find(u => u.email == email && u.senha == senha)
        
        // console.log({ user })

        if (user) {
            req.session.user = user;
            return res.send('Login sucesso');
        }
        else 
            return res.redirect('/login.html');
    }

    async logout(req, res) {
        req.session.destroy();
    }
}

module.exports = { LoginController }
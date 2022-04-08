const { getConnection } = require("../data/database");
const { findAll } = require("../data/memory-db");

const bcrypt = require('bcrypt');

class LoginController {

    async login(req, res) {
        const { email, password } = req.body;
        
        const con = await getConnection();
        const result = await con.query('SELECT * FROM users WHERE email = $1', [email])
        // const users = findAll();
    
        const user = result.rows[0];
        console.log({user})
        
        let verified = null;
        if (user)
            verified = bcrypt.compareSync(password, user.password);
        else
            return res.send('USUARIO NAO ENCONTRADO');


        if (verified) {
            req.session.user = user;
            return res.redirect(`/users/${user.id}`);
        }
        else 
            return res.redirect('/login.html');
    }

    async logout(req, res) {
        req.session.destroy();
        return res.redirect('/login.html');
    }
}

module.exports = { LoginController }
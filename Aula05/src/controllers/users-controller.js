const { findAll, save, getById } = require("../data/memory-db");
const { nanoid } = require('nanoid');
const User = require("../models/user");
const { getConnection } = require("../data/database");

class UserController {

    // INPUT
    // PARSER
    // LOGIC
    // OUTPUT (RENDER / RESPONSE)

    async create(req, res) {
        const { name, email, password } = req.body;

        const id = nanoid(8)
        const user = new User(id, name, email, password);
        const con = await getConnection();

        const sql = `INSERT INTO public.users ("name",email,"password")
	    VALUES ($1, $2, $3);`
        
        const values = [user.name, user.email, user.password];

        await con.query(sql, values)
        save(user);
        return res.send(`Salvando o usuario ${JSON.stringify(req.body)}`)
    }

    async list(req, res) {
        // const users = findAll();

        // PEGAR A CONNECTION DO BANCO
        const con = await getConnection();
        const result = await con.query('SELECT * FROM users');
        console.log({ rows: JSON.stringify(result.rows, null, 2) });
        const users = result.rows;
        return res.render('page-users', { title: 'Lista', users: users });
    }

    async detail(req, res) {
        const { id } = req.params;
        // const id = req.params.id;
        
        const { user } = req.session;

        if (user?.type == 'CLIENT' && user?.id != id) {
            return res.send('Voce nao é o usuário logado desse perfil')
        } 

        const con = await getConnection();
        const result = await con.query(`select * from users u where u.id = ${id}` );
        const perfil = result.rows[0];
        return res.render('detail-user', { user: perfil });
        // if (user) return res.render('detail-user', { user });
        // return res.redirect('error.html');
    }
}

module.exports = UserController;
const { findAll, save, getById } = require("../data/memory-db");
const { nanoid } = require('nanoid');
const { User, UserDAO } = require("../models/user");
const { getConnection } = require("../data/database");

const bcrypt = require('bcrypt');

class UserController {

    // INPUT
    // PARSER
    // LOGIC
    // OUTPUT (RENDER / RESPONSE)

    async create(req, res) {
        const { name, email, password } = req.body;

        const encryptedPassword = bcrypt.hashSync(password, 10);
        
        const user = new User(null, name, email, encryptedPassword);
        await UserDAO.insert(user);

        return res.send(`Salvando o usuario ${JSON.stringify(req.body)}`)
    }

    async list(req, res) {
        let { page } = req.query;
        // const users = findAll();
        if (!page)
            page = 0;
        
            // PEGAR A CONNECTION DO BANCO
        const con = await getConnection();
        const sql = `
        select * from users u
        order by name
        limit 5
        offset $1`;
        const offset = 5 * page;
        const result = await con.query(sql, [offset]);
        console.log({ result })
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
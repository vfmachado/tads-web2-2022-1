const { findAll, save, getById } = require("../data/db");
const { nanoid } = require('nanoid');
const User = require("../models/user");

class UserController {

    // INPUT
    // PARSER
    // LOGIC
    // OUTPUT (RENDER / RESPONSE)

    async create(req, res) {
        const { name, email, password } = req.body;

        const id = nanoid(8)
        const user = new User(id, name, email, password);
        save(user);
        return res.send(`Salvando o usuario ${JSON.stringify(req.body)}`)
    }

    async list(req, res) {
        const users = findAll();
        return res.render('page-users', { title: 'Lista', users: users });
    }

    async detail(req, res) {
        const { id } = req.params;
        // const id = req.params.id;
        
        const { user } = req.session;

        if (user?.type == 'default' && user?.id != id) {
            return res.send('Voce nao é o usuário logado desse perfil')
        } 

        const perfil = getById(id);
        return res.render('detail-user', { user: perfil });
        // if (user) return res.render('detail-user', { user });
        // return res.redirect('error.html');
    }
}

module.exports = UserController;
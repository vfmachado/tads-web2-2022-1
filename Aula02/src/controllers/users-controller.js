const { findAll, save } = require("../data/db");
const User = require("../models/user");

class UserController {

    // INPUT
    // PARSER
    // LOGIC
    // OUTPUT (RENDER / RESPONSE)

    async create(req, res) {
        const { name, email, password } = req.body;
        const user = new User(name, email, password);
        save(user);
        return res.send(`Salvando o usuario ${JSON.stringify(req.body)}`)
    }

    async list(req, res) {
        const users = findAll();
        return res.render('page-users', { title: 'lista', users: users });
    }

}

module.exports = UserController;
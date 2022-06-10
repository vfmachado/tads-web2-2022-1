
const { Subscriber } = require("../models/Subscriber");
const crypto = require('crypto');
const { getPersona } = require("../star-api/star-people");
module.exports = class UsersController {

    constructor() {
        
    }

    async newSubscriber(req, res) {
        const subscriber = req.body;
        const password = crypto.randomUUID();
        const resultModel = await Subscriber.create({...subscriber, password});

        // ENVIAR UM EMAIL =)

        res.json({
            msg: "Registrando o membro",
            resultModel
        });
    }

    async list(req, res) {
        const subscribers = await Subscriber.findAll();
        return res.json({
            requestedBy: req.user.name,
            subscribers
        });
    }

    async detail(req, res) {
        const { id } = req.params;
        const user = await Subscriber.findOne({
            where: {
                id: id
            }
        });
        const nickname = await getPersona(id);
        return res.json({
            nickname,
            user
        });
    }
}
const { Subscriber } = require("../models/Subscriber");

module.exports = class UsersController {

    constructor() {
        
    }

    async newSubscriber(req, res) {
        const subscriber = req.body;
        const resultModel = await Subscriber.create(subscriber);

        // ENVIAR UM EMAIL =)

        res.json({
            msg: "Registrando o membro",
            resultModel
        });
    }
}
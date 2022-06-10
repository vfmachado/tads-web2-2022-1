const { Subscriber } = require("../models/Subscriber");

const isAuth = async (req, res, next) => {
    console.log({ headers: req.headers  })

    const key = req.headers.key;
    if (key) {
        const user = await Subscriber.findOne({ where: { 
            password: key
        }});
        if (user) {
            req.user = user;
            return next();
        }
    }

    return res.status(403).json({
        msg: 'KEY NOT VALIDATED!'
    });
}

module.exports = { isAuth };
const { user } = require("pg/lib/defaults");
const sequelize = require("./db");
const User = require ('./User');
const Message = require('./Message');

(async () => {
    
    User.hasMany(Message, {
        foreignKey: 'from',
        as: 'sentMessages'
    })  
    Message.belongsTo(User, {
        foreignKey: 'from'
    });

    User.hasMany(Message, {
        foreignKey: 'to',
        as: 'receivedMessages'
    })
    Message.belongsTo(User, {
        foreignKey: 'to'
    });

    await sequelize.sync();
    
    console.log('Funcao de select');
    const user = await User.findOne({
        where: {
            name: 'Vini'
        },
        include: [
            { model: Message, as: 'sentMessages' },
            { model: Message, as: 'receivedMessages' }
        ]
    });

    // users.forEach(u => {
    //     console.log({ user: u.name})
    // })
    console.log({ user: JSON.stringify(user, null, 2) });
})()
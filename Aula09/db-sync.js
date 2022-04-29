const sequelize = require("./db");
const User = require ('./User');
const Message = require('./Message');

const dbsync = async () => {
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
    
} 

module.exports = dbsync;
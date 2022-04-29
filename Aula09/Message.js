const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Message = sequelize.define('Message', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    from: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    to: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
    tableName: 'messages'
});

module.exports = Message;
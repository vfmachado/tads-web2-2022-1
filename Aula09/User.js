const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define('User', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'CLIENT'
    },
    imgUrl: {
        type: DataTypes.STRING,
        field: 'img_url'
    }
}, {
    // Other model options go here
    tableName: 'users2'
});

module.exports = User;
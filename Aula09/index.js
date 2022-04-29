const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://xekauhxcynltjx:bb400288324479148012cb940fac53bdfeac7c4b989487cb96f6da8928215c06@ec2-3-228-222-169.compute-1.amazonaws.com:5432/d2i84tvst90v12', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

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

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync();

        const users = await User.findAll();
        console.log("USERS LENGTH: " + users.length);

        await User.create({
            name: 'Renan',
            email: 'renan@email.com',
            password: 'qweasd',
            imgUrl: 'url da imagem do renan'    
        })

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
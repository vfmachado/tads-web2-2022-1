const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('postgres://xekauhxcynltjx:bb400288324479148012cb940fac53bdfeac7c4b989487cb96f6da8928215c06@ec2-3-228-222-169.compute-1.amazonaws.com:5432/d2i84tvst90v12', {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

class Image extends Model {}
    
Image.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING
}, { sequelize, modelName: 'image' });

sequelize.sync();

module.exports = { Image };
const sequelize = require("./db");
const Message = require ('./Message');

(async () => {
    
    await sequelize.sync();
    
    console.log('Inserir nova message');
    const message = await Message.create({
       from: 1,
       to: 2,
       text: 'Sim, temos aula'
    });
    
     console.log({ message });
})()
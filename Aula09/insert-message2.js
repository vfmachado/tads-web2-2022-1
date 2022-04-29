const User = require('./User');
const Message = require ('./Message');
const dbsync = require("./db-sync");

(async () => {
    
    await dbsync();
    
    console.log('Inserir nova message atraves do user');
    
   // pode vir da sessao do usuario logado
   const user = await User.findByPk(1);
   // console.log(user)

   // pode vir de uma lista de contatos
   const receiver = await User.findByPk(2);
   
   const message = await Message.create({
      from: user.id,
      to: receiver.id,
      text: 'Mensagem com o id do usuario dinamico'
   });
    
    
      console.log({ message });
})()
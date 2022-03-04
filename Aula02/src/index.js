const path = require('path');
const express = require('express');
const { save, findAll } = require('./data/db');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './src/view');

//PARSER DO CORPO DA REQUISICAO (req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  
  //return res.send(__dirname);
  const filepath = path.join(__dirname, 'view', 'initial.html');
   return res.sendFile(filepath);
});

const userRoutes = require('./routes/users-routes');
app.use('/users', userRoutes);


app.listen(3000, () => console.log(`Listen at ${3000}`));
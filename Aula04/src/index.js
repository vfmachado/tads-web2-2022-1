const path = require('path');
const express = require('express');
const session = require('express-session')

const app = express();

app.use(session({
  secret: 'CHAVE DA APLICAÇÃO',
  resave: false,            // FORÇA O SALVAR DA SESSION MESMO QUE NÃO MODIFICADA
  saveUninitialized: true,  // SALVAR UMA SESSION QUE NÃO INICIALIZADA
  cookie: { secure: false } // HTTP / HTTPS
}));

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './src/view');

// app.use((req, res, next) => {
//   console.log('Antes do parser');
//   console.log({ body: req.body });
//   next();
// })

//PARSER DO CORPO DA REQUISICAO (req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('Depois do parser');
  console.log({ body: req.body });
  console.log({ sessionId: req.sessionID, session: req.session });
  next();
})

app.get('/', (req, res) => {
  //return res.send(__dirname);
  const filepath = path.join(__dirname, 'view', 'initial.html');
   return res.sendFile(filepath);
});


const userRoutes = require('./routes/users-routes');
const { getConnection } = require('./data/database');
app.use('/users', userRoutes);


app.use('*', (req, res) => {
  res.redirect('/error.html');
});

app.listen(3000, () => console.log(`Listen at ${3000}`));

getConnection();

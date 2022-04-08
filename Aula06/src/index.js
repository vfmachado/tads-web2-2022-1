const dotenv = require('dotenv');
if (process.env.NODE_ENV == 'development')
  dotenv.config({
    path: '.env.dev'
  });

console.log({
  NODE_ENV: process.env.NODE_ENV,
  VERSION: process.env.VERSION,
  PORT: process.env.PORT
})

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

const { getConnection } = require('./data/database');

const userRoutes = require('./routes/users-routes');
app.use('/users', userRoutes);

const pollRoutes = require('./routes/poll-routes');
app.use('/poll', pollRoutes);

app.use('*', (req, res) => {
  res.redirect('/error.html');
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listen at ... ${PORT}`));

getConnection();

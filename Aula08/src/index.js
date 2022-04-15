// CONFIGURACAO INICIAL / SETUP DO SERVIDOR

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/view');


//PARSER DO CORPO DA REQUISICAO (req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middlewares
app.use((req, res, next) => {
    if (req.method != 'GET') {
        // SALVA NO BANCO AS INFORMACOES NECESSARIAS
    }
  console.log('Depois do parser');
  console.log({ body: req.body });
  console.log({ sessionId: req.sessionID, session: req.session });
  next();
})

app.get('/', (req, res) => {
  return res.render('initial');
  //return res.send(__dirname);
  // const filepath = path.join(__dirname, 'view', 'initial.html');
  //  return res.sendFile(filepath);
});

const { getConnection } = require('./config/database');

const postsRouter = require('./routes/posts-routes');
app.use('/posts', postsRouter);


app.use('*', (req, res) => {
  res.status(404).send('NOT FOUND');
});

const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
    getConnection();
    console.log(`Listen at ... ${PORT}`)
});



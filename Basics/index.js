const express = require('express');
const app = express();

const users = [
  {
    id: 1,
    name: 'Marvyn'
  },
  {
    id: 2,
    name: 'Andre'
  },
  {
    id: 3,
    name: 'Ismael'
  },
  {
    id: 4,
    name: 'Renan'
  },
  {
    id: 5,
    name: 'Marcelo'
  }
]

app.use('*', (req, res, next) => {
  console.log('Middleware');
  console.log({
    baseUrl: req.baseUrl,
    method: req.method,
    query: req.query,
  });

  if (req.baseUrl == '/admin') return res.redirect('https://google.com');
  
  next();
});

app.get('/', (req, res) => {
  // console.log({ req });
  const baseUrl = req.baseUrl;
  const query = req.query;
  const method = req.method;
  res.send(`Bem vindo ${query.name}!!! Express & nodemon`);
});

app.get('/fatorial', (req, res) => {
  const { value } = req.query;
  // const value = req.query.value;
  const n = Number(value);
  if (isNaN(n)) {
    res.send('value não é um número');
  } else {
    let x = 1;
    for (let i = 1; i <= n; i++) {
      x = x * i;
    }
    res.send(`Fatorial de ${value} eh ${x}`);
  }
});

app.get('/users/:id', (req, res) => {
  const user = users.filter(u => u.id == req.params.id)[0]
  if (user)
    return res.send(`<pre> ${JSON.stringify(user, null, 2)} </pre>`);
  
  res.status(404).send('nao exite usuario nesse ID')
});

app.listen(3000, () => console.log('Listening at 3000'));

const express = require("express");

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        healthy: true,
        version: "0.0.1-SNAPSHOT"
    })
});

const UsersController = require('./controllers/UsersController');
const controller = new UsersController();

app.post('/users', controller.newSubscriber);

app.listen(3000, () => console.log("Listening at 3000"));
const express = require("express");
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({
        healthy: true,
        version: "0.0.1-SNAPSHOT"
    });
});

const UsersController = require('./controllers/UsersController');
const { isAuth } = require("./middlewares/Auth");
const controller = new UsersController();

app.post('/users', controller.newSubscriber);
app.get('/users', isAuth, controller.list);

app.get('/users/:id', isAuth, controller.detail);

app.listen(3000, () => console.log("Listening at 3000"));
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/photobomb', {
    useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const users = require("./users.js");
app.use("/api/users", users.routes);

const pokemon = require("./pokemon.js");
app.use("/api/pokemon", pokemon.routes);

const comments = require("./comments.js");
app.use("/api/comments", comments.routes);

app.use(express.static('../public'));

app.listen(3001, () => console.log('Server listening on port 3001!'));

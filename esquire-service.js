// Require express and create an instance of it
var express = require('express');
var app = express();
const axios = require('axios');

// on the request to root (localhost:3002/)
app.get('/', function (req, res) {
    return res.status(200).send({ message: "Welcome to the Esquire Micro-service" });
});

app.get("/esquire", async (req, res) => {
    res.status(200).send("Simon Owusu Esq :)");
});

app.get("/go", async (req, res) => {

    const result = await axios({
      method: 'GET',
      url: 'http://192.168.0.9:4000/go'
    })
    return res.status(200).send({ message: "Calling Golang Service..." });
});

// Change the 404 message modifing the middleware
app.use(function(req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

// start the server in the port 3001 !
app.listen(3002, function () {
    console.log('Esquire Service is listening on port 3002.');
});

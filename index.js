const { restart } = require("nodemon");
const express = require("express");
// const winston = require("winston");
const config = require("config");
const cors = require("cors");
const app = express();

// startup routes
require("./startup/routes")(app);
// startup db
require("./startup/db")();
// startup logging
// require("./startup/logging")();
// startup config
require("./startup/config")();
// startup production
require('./startup/prod')(app);

// startup
app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth-token')
    next()
})

// SHOW API ENDPOINT On /API
app.get('/api', (req, res, next) => {
    res.status(200).json({ endpoint: "APIENDPOINT" });
})



console.log('index', process.env['vidly_db']);


// throw new Error('Error');
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;

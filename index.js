const { restart } = require("nodemon");
const express = require("express");
// const winston = require("winston");
const config = require("config");
const cors = require("cors");
const app = express();
// startup cors
app.use(cors());
require('./startup/cors')(app);
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


// SHOW API ENDPOINT On /API
app.get('/api', (req, res, next) => {
    res.status(200).json({ endpoint: "APIENDPOINT" });
})



console.log('index', process.env['vidly_db']);


// throw new Error('Error');
const port = process.env.PORT || 3900;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;

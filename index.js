const { restart } = require("nodemon");
const express = require("express");
const winston = require("winston");
const config = require("config");
const cors = require("cors");
const app = express();

// startup routes
require("./startup/routes")(app);
// startup db
require("./startup/db")();
// startup logging
require("./startup/logging")();
// startup config
require("./startup/config")();

// throw new Error('Error');
const port = config.get("port") || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));

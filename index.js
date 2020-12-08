// Express Setup
require('dotenv').config()
const express = require("express");
const app = express();
app.use(express.json());

// Router Setup
const router = require('./src/router')
app.use('/api/v1', router);

module.exports = app;
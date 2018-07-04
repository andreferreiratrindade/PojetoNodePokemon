'use strict'

const express = require('express');
const consign = require('consign');
const app = express();

consign({verbose: false})
    .include('libs/config.js')
    .then('libs/configDB/config.js')
    .then('libs/db.js')
    .then('src/repositories')
    .then('src/domains')
    .then('src/controllers')
    .then('libs/middlewares.js')
    .then('src/routes')
    .then('libs/boot.js')
    .into(app);

module.exports = app;

const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
module.exports = app => {
    app.set("port", process.env.port || 3000);

    app.use(bodyParser.json({
        limit: '5mb'
    }));
    
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    
    // Habilita o CORS
    app.use(function (req, res, next) {
        
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    });
    app.use(compression());
    app.use(express.static("public"));
    
}
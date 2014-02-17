// __Dependencies__

var express = require('express');
var mongoose = require('mongoose');
var baucis = require('baucis');
var swagger = require('baucis-swagger');

// configure gform schema generator
var gform = require('baucis-gform');
var TabGroupCreator = require('mongoose-schema/groupcreator/TabGroupCreator');
var creator = new TabGroupCreator();
gform.generatorProps = {groupCreator: creator};

// initialize db
require("./data");

// __Main Program__

// Connect to the Mongo instance
mongoose.connect('mongodb://127.0.0.1/test');

// add cors support
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // dojo sends X-Requested-With and If-None-Match (for insert)
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, If-None-Match');

    next();
}


// Create the API routes
baucis.rest('User');
baucis.rest('BlogPost');


// Create the app and listen for API requests
var app = express();
app.use(allowCrossDomain);
app.use('/api', baucis());
app.use("/client", express.static("client"));
app.listen(3333);

console.log('Server listening on port 3333.');



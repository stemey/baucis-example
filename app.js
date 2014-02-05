// __Dependencies__

var express = require('express');
var mongoose = require('mongoose');
var baucis = require('baucis');
var swagger = require('baucis-swagger');
var gform = require('baucis-gform');

// __Main Program__

// Connect to the Mongo instance
mongoose.connect('mongodb://127.0.0.1/test');

// Create a Mongoose schema


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, If-None-Match');

    next();
}

//design:'sidebar|headline', gutters:true, liveSplitters:true
//splitter:true  region:leading

/*//...
app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'cool beans' }));
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});*/

var Berry = new mongoose.Schema(
    {
        name: String

    }, {"_id": false});
var Vegetable = new mongoose.Schema(
    {
        name: String,
        features: [String],
        berries: [Berry],
        related: {type: mongoose.Schema.ObjectId, ref: "vegetable"},
        embedded:{
            x: String
        }
    });

var Car = new mongoose.Schema(
    {
        name: String,
        vegetables: [{type: mongoose.Schema.ObjectId, ref: "vegetable"}]

    });




// Note that Mongoose middleware will be executed as usual
Vegetable.pre('save', function (next) {
  console.log('A vegetable was saved to Mongo: %s.', this.get('name'));
  next();
});

// Register the schema
mongoose.model('vegetable', Vegetable);
mongoose.model('car', Car);

// Create dummy data
var names = [ 'tomato', 'turnip', 'lovage', 'snap pea', 'carrot', 'zucchini' ];
var vegetables = names.map(function (name) { return { name: name } });

// Clear the database of old vegetables
mongoose.model('vegetable').remove(function (error) {
  if (error) throw error;

  // Put the fresh vegetables in the database
  mongoose.model('vegetable').create(vegetables, function (error) {
    if (error) throw error;

    // Create the API routes
    baucis.rest('vegetable');
    baucis.rest('car');

    // Create the app and listen for API requests
    var app = express();
      app.use(allowCrossDomain);
    app.use('/api', baucis());
    app.use("/client", express.static("client"));
    app.listen(3333);

    console.log('Server listening on port 3333.');
  });
});


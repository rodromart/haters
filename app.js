
var express     = require("express");
    app         = express();
    bodyParser  = require("body-parser");
    methodOverride = require("method-override");
    mongoose    = require("mongoose");

    //token auth includes
    var cors = require('cors');
    var authCtrl = require('./auth');
    var middleware = require('./middleware');


    //Conect DB
    mongoose.connect('mongodb://localhost/haters', function(err, res) {
      	if(err) {
      		console.log('ERROR: connecting to Database. ' + err);
      	} else {
      		console.log('Connected to Database');
      	}
      });


    // Middlewares
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Import Models and controllers
    var models     = require('./models/hates')(app, mongoose);
    var HatesCtrl = require('./controllers/haters');

    // Initial Page
    var router = express.Router();
    router.get('/', function(req, res) {
      res.send("Hello world!");
    });
    app.use(router);

    // API routes
    var haters = express.Router();

    haters.route('/hates')
      .get(HatesCtrl.findAll)
      .post(HatesCtrl.addHate);

    haters.route('/hates/:id')
      .get(HatesCtrl.findById)
      .put(HatesCtrl.updateHate)
      .delete(HatesCtrl.deleteHate);

    app.use('/api/v0/', haters);

    //Start server
    app.listen(3000, function(){
      console.log("Node server on http://localhost:3000");
    });

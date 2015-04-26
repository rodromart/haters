
// server.js
var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var cors        = require('cors');
var user        = require('./models/user');
var hates       = require('./models/hates');
var authCtrl    = require('./auth');
var middleware  = require('./middleware');

// Configuramos Express
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', 3000);

// Importamos nuestros modelos,
// en este ejemplo nuestro modelo de usuario

// Iniciamos las rutas de nuestro servidor/API
var router = express.Router();

//Welcome page
router.get('/', function(req, res) {
  res.send("Hello, welcome Haters api v0!");
});

// Rutas de autenticación y login
router.post('/auth/signup', authCtrl.emailSignup);
router.post('/auth/login', authCtrl.emailLogin);

// Ruta solo accesible si estás autenticado
var HatesCtrl = require('./controllers/haters');
router.route('/private/hates')
  .post(middleware.ensureAuthenticated, HatesCtrl.addHate)
  .get(middleware.ensureAuthenticated, HatesCtrl.findAll);

router.route('/private/hates/:id')
    .get(middleware.ensureAuthenticated, HatesCtrl.findById)
    .put(middleware.ensureAuthenticated, HatesCtrl.updateHate)
    .delete(middleware.ensureAuthenticated, HatesCtrl.deleteHate);

app.use(router);

// Iniciamos el servidor y la base de datos
//Conect DB
mongoose.connect('mongodb://localhost/haters', function(err, res) {
    if(err) {
      console.log('ERROR: connecting to Database. ' + err);
    } else {
      console.log('Connected to Database');
      app.listen(app.get('port'), function(){
          console.log('Express corriendo en http://localhost:3000');
      });
    }
  });

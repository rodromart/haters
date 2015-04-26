// auth.js
var mongoose = require('mongoose');
var User = mongoose.model('User');
var service = require('./service');


exports.emailSignup = function(req, res) {
  console.log('EmailSignUp POST');
  console.log(req.body);

  User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {

  if(err){
    var user = new User({
        // Creamos el usuario
        email:    req.body.email,
        pass:     req.body.pass,
        bio:      req.body.bio
    });
    console.log(user);
    user.save(function(err, user) {
      if(err) return res.send(500, err.message);

      res.status(200)
         .send({token: service.createToken(user)});
    });
  }
  if(!err) return res.send(500, 'User SingUp previously!');

  });
};

exports.emailLogin = function(req, res) {
   console.log('LOGIN');
   console.log(req.body);
   
    User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {

            if(err) return res.send(500, err.message);
            if(req.body.pass = user.pass)
              return res
                .status(200)
                .send({token: service.createToken(user)});
            else res.send(403, 'User or pass is incorrect');
    });
};

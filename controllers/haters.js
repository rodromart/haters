

//File: controllers/haters.js
var mongoose = require('mongoose');
var Haters  = mongoose.model('Haters');

//GET - Return all hates in the DB
exports.findAll = function(req, res) {
  Haters.find(function(err, hates) {
    if(err)
      res.send(500, err.message);
    console.log('GET /hates')
    res.status(200).jsonp(hates);
    });
}

//GET - Return a hates with specified ID
exports.findById = function(req, res) {
  Haters.findById(req.params.id, function(err, hate) {
    if(err) return res.send(500, err.message);

    console.log('GET /hate/' + req.params.id);
        res.status(200).jsonp(hate);
    });
};

//POST - Insert a new Hate in the DB
exports.addHate = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var hate = new Haters({
      user:  req.body.user,
      hateUrl:  req.body.hateUrl,
      commet: req.body.commet
    });
    console.log(hate);
    hate.save(function(err, hate) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(hate);
    });
};

//PUT - Update a register already exists
exports.updateHate = function(req, res) {
  Haters.findById(req.params.id, function(err, hate) {
    hateUrl:  req.body.hateUrl;
    commet: req.body.commet;
    timestap: new Date().getTime();

    Haters.save(function(err) {
      if(!err) {
      console.log('Updated');
      } else {
      console.log('ERROR: ' + err);
      }

      res.send(hate);
    });
  });
}


//DELETE - Delete a Hates with specified ID
exports.deleteHate = function(req, res) {
  Haters.findById(req.params.id, function(err, hate) {
    hate.remove(function(err) {
      if(!err) {
      console.log('Removed');
      } else {
      console.log('ERROR: ' + err);
      }
      res.status(200);
    })
  });
}

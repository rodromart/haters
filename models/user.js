var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var userSchema = new Schema({
      email:    { type: String,
                  unique: true,
                  required: true
                },
      pass:     { type: String,
                  required: true
                },
      bio:      { type: String },
      createDate:{ type: Date, default: Date.now} ,
      updateDate: { type: Date, default: Date.now},
      lastConctDate:{ type: Date, default: Date.now}
});



// Execute before each user.save() call
userSchema.pre('save', function(callback) {
  var user = this;

  // Break out if the password hasn't changed
  if (!user.isModified('pass')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.pass, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.pass = hash;
      user.updateDate = Date.now;
      callback();
    });
  });
});

module.exports = mongoose.model('User', userSchema);

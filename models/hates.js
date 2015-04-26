var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var hatesSchema = new Schema({
      user:     { type: String },
      hateUrl:  { type: String },
      hateImg:  { data: Buffer, contentType: String },
      commet:   { type: String },
      timestap: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Haters', hatesSchema);

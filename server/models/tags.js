// Tag Document Schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

// module.exports = function() {
var tagSchema = new Schema({
    name: String

    // url: String
});
  
tagSchema
.virtual('url')
.get(function () {
  return '/post/tag/' + this._id;
});

module.exports = mongoose.model('Tag', tagSchema);

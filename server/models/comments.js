// Question Document Schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema


var commentSchema = new Schema({
    text: String,
    ans_by: {type: String, default: "Anonymous"},
    ask_date_time: {type: Date, default: Date.now},


    // url: String
});

commentSchema
.virtual('url')
.get(function () {
  return '/post/comment/' + this._id;
});

module.exports = mongoose.model('Comment', commentSchema);



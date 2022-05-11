// Answer Document Schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

const commentSchema = require('./comments').schema;

var answerSchema = new Schema({
    text: String,
    ans_by: String,
    ans_date_time: {type: Date, default: Date.now},
    comments: [commentSchema],
    votes: {type: Number, default: 0},
    comPage: {type: Number, default: 1}

    // url: String
});
    
answerSchema
.virtual('url')
.get(function () {
  return '/post/answer/' + this._id;
});

module.exports = mongoose.model('Answer', answerSchema);

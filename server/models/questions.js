// Question Document Schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  
const answerSchema = require('./answers').schema;
const tagSchema = require('./tags').schema;
const commentSchema = require('./comments').schema;


var questionSchema = new Schema({
    title: String,
    text: String,
    tags: [tagSchema], //reference to the associated tag
    answers: [answerSchema], //reference to the associated answer
    comments: [commentSchema],
    asked_by: {type: String, default: "Anonymous"},
    ask_date_time: {type: Date, default: Date.now},
    views: {type: Number, default: 0},
    votes: {type: Number, default: 0}

    // url: String
});

questionSchema
.virtual('url')
.get(function () {
  return '/post/question/' + this._id;
});

module.exports = mongoose.model('Question', questionSchema);



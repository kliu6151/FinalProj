var bcrypt = require('bcrypt')
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    reputation: {type: Number, default: 0},
    votedOn: { type : Array , "default" : [] }
});

userSchema
.virtual('url')
.get(function () {
  return '/post/user/' + this._id;
});

//Creating a password hash
userSchema.methods.createHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null);
};


//Ensuring the password is valid
userSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password) 
};

module.exports = mongoose.model('User', userSchema);
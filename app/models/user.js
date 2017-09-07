const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs')
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    }
})


/*  
    HASHING THE PASSWORD BEFORE SAVING THE USER SCHEMA INTO THE DATABASE
    USING PRE-SAVE MONGOOSE METHOD AND BCRYPT HASHING MIDDLEWARE.
*/
UserSchema.pre('save', function(next) {
    var user = this;

    bcrypt.hash(user.password, null, null, function(err, hash) {
        if(err) return next(err);

        user.password = hash;
        next();
    });
});


module.exports = mongoose.model('User', UserSchema);
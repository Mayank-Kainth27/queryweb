var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    fullname: {
        type: String
    },

    email: {
        type: String
    },

    googleId: {
        type: String
    },

    password: {
        type: String
    },

    ques: [String],

    ans: [String]
});

module.exports = mongoose.model('User', userSchema);
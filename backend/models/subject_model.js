const mongoose = require("mongoose");

var subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String
    }
});


module.exports = mongoose.model('Subject', subjectSchema);
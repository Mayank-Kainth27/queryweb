const mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: [String]
});


module.exports = mongoose.model('Exercise', courseSchema);
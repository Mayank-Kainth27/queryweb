const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
require('dotenv').config();
const jwt = require('jsonwebtoken');
require('./models/user_model');
require('./models/exercise_model');
require('./services/passport');

JWTvalidator = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, "LAKSHAY", (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            req.user = data.id;
            next()
        }
    })
}

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb+srv://dbUser:dbUser@cluster0-0hkv1.mongodb.net/test?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (error) => {
    if (!error) {
        console.log("Mongo Connection Successful .....");
    }
    else {
        console.log("Error Connecting to Mongo !!!!!" + error);

    }
});



const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercise', JWTvalidator, exercisesRouter);
app.use('/user', usersRouter);
require('./routes/googleLogin')(app);


const port = 5000
app.listen(port, () => {
    console.log('Server is running on port: 5000.....');
});
//google client id: '853632123149-kt8rima32oj6i1borovifmk57e9fmmce.apps.googleusercontent.com'
//google secret "Vjwk6ziHTsZfDAWGh5xJGkBj"

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
    clientID: '853632123149-kt8rima32oj6i1borovifmk57e9fmmce.apps.googleusercontent.com',
    clientSecret: 'Vjwk6ziHTsZfDAWGh5xJGkBj',
    callbackURL: '/login/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    console.log(profile.emails[0].value);
    const existingUser = await User.findOne({ googleId: profile.id })
    if (existingUser) {
        //we already have user id
        return done(null, existingUser);
    }
    const user = await new User({ googleId: profile.id, fullname: profile.displayName, email: profile.emails[0].value }).save()
    done(null, user);
})); 
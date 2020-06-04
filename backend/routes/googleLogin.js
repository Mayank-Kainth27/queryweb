const passport = require('passport');

module.exports = (app) => {
    app.get('/login/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    app.get(
        '/login/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('http://localhost:3000/exercise/main');
        }
    );

    app.use('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })


    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })

};
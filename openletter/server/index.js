const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.use(bodyParser.json());
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
    console.log("DB is connected");
});


app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: 'jordanshort.auth0.com',
    clientID: 'LP55tMh6LiEd3QDXA5SwH8A97sqYl0yv', 
    clientSecret: 'yuY8CV9yMD0LTDCPQyVILrcFZmdWxs3wue1U-1ibEzfpJm8tpbXsS2xAq2YHdXuS',
    callbackURL: 'http://localhost:6000/auth/callback',
    scope: 'openid profile'
}, function(accessToken, refreshToken, extraParams, profile, done){
    // const picture = 'https://robohash.org/me';
    const { sub, name, picture } = profile._json;
    app.get('db').findUser([sub]).then(response => {
        if (response[0]){
            return done(null, response[0]);
        } else {
            app.get('db').createUser([name, picture, sub]).then(response => {
               return done(null, response[0]);
            });
        };
    });

}));

passport.serializeUser((user, done) => {
    //what you pass into done here is what is stored on the session
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const db = app.get('db');
    db.find_logged_in_user([id]).then(resp => {
       return done(null, resp[0]);
    });
});

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/home'
}))

app.get('/auth/authenticated', (req, res) => {
    if (!req.user){
        res.status(404).send('Please Login')
    } else {
        res.status(200).send(req.user);
    }
});
//logout endpoint
app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000');
});

app.listen(SERVER_PORT, () => console.log('Listening on port ' +SERVER_PORT));
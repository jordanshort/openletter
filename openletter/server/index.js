const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , letterctrl = require('./letterController')
    , userctrl = require('./userController')
    , responsectrl = require('./responseController')
    , networkctrl = require('./networkController')
    , socket_io = require('socket.io')
    , S3 = require('./s3')
    , cors = require('cors')
    , path = require('path')
    , http = require('http');
const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, AWS_SECRET_ACCESS_KEY, 
    AWS_ACCESS_KEY_ID, AWS_REGION, AWS_BUCKET, CALLBACK_URL, REDIRECT_URL, LOGOUT_REDIRECT } = process.env;
const server = http.createServer(app)
    , io = socket_io(server);

app.use( express.static( `${__dirname}/../build` ) )

massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
});

S3(app);

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
    callbackURL: CALLBACK_URL,
    scope: 'openid profile email'
}, function(accessToken, refreshToken, extraParams, profile, done){
    // const picture = 'https://robohash.org/me';
    const { sub, given_name, family_name, picture, gender, email } = profile._json;
    app.get('db').findUser([sub]).then(response => {
        if (response[0]){
            return done(null, response[0]);
        }  else {
            app.get('db').createUser([given_name, family_name, picture, gender, email, sub]).then(response => {
               return done(null, response[0]);
            });
        };
    });

}));

 

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const db = app.get('db');
    //what you pass into done here is what is stored on the session    
    db.find_logged_in_user([id]).then(resp => {
       return done(null, resp[0]);
    });
});


//login endpoints
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: REDIRECT_URL
}))

//authentication endpoints
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
    res.redirect(LOGOUT_REDIRECT);
});

//letter endpoints
app.post('/letters/new', letterctrl.post);
app.get('/letters/mine', letterctrl.get);
app.get('/letters/:id', letterctrl.getLetter);
app.get('/authletters/:author', letterctrl.getAuthLetters);
app.put('/letters/:id', letterctrl.editLetter);
app.delete('/letters/:id', letterctrl.delete);
app.get('/followingletters', letterctrl.getFollowingLetters);
app.post('/search', letterctrl.search);
app.post('/saveletter/:id', letterctrl.save);
app.get('/saved', letterctrl.getSaved);
app.delete('/saved/:id', letterctrl.deleteSaved);
app.get('/topten', letterctrl.getTopTen);

//user endpoints
app.get('/user/:id', userctrl.getAuthor);
app.get('/user', userctrl.getUser);
app.put('/user', userctrl.updateProfile);
app.get('/following', networkctrl.getFollowing);
app.get('/followers', networkctrl.getFollowers);
app.get('/recommended', userctrl.getRecommended);
app.post('/following/new', userctrl.addFollowing);
app.get('/notifications', userctrl.getNotifications);
app.put('/notifications', userctrl.markRead);

//response endpoints
app.post('/response/:letterid', responsectrl.postResponse);
app.get('/responses/:letterid', responsectrl.getResponses);
app.get('/cosigners/:id', responsectrl.getCosigners);

let users = {};
io.on('connection', function(socket){
    socket.on('check in', function (data) {
        app.get('db').addSocket([socket.id, data.userID]).then((resp) => {
        }).catch(err => console.log(err));
    });

    socket.on('cosign', function(data){
        let items = [
            data.authorID,
            data.userID,
            data.letterID,
            'cosigned your letter', 
            'cosign'
        ]
        app.get('db').letterCosign([data.userID, data.letterID]).then(resp => {
            app.get('db').recordNotification(items).then(resp => {
                app.get('db').findAuthor([resp[0].letter_id]).then(resp => {
                    if (resp[0].socket_id){
                    io.sockets.connected[resp[0].socket_id].emit('cosign', 'Someone just cosigned your letter!');
                    }
                });
            })
        })
            
    });

    socket.on('response', function(data){
        let items = [
            data.authorID,
            data.userID,
            data.letterID,
            'responded to your letter',
            'response'
        ]
        app.get('db').recordNotification(items).then(resp => {
            app.get('db').findAuthor([resp[0].letter_id]).then(resp => {
                if (resp[0].socket_id){
                    io.sockets.connected[resp[0].socket_id].emit('response', 'Someone just responded to your letter!')
                }
            })
        })
    })
    
    socket.on('test', function(data){
        console.log(socket.id)
    })
    


})

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

server.listen(SERVER_PORT, () => console.log('Listening on port ' +SERVER_PORT));
const config = require('./config.json');
const express = require('express');
const passport = require('passport');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const VKStrategy = require('passport-vkontakte').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
})

passport.use(new VKStrategy({
    clientID: config.vkontakte.key,
    clientSecret: config.vkontakte.secret,
    callbackURL: "http://localhost:3000/auth/vk/callback"
},
function(accessToken, refreshToken, params, profile, done){
    return done(null, profile)
}));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/vk', passport.authenticate('vkontakte'));

app.get('/auth/vk/callback',
  passport.authenticate(
      'vkontakte',
      { failureRedirect: '/login' }
  ), (req, res) => {
      res.redirect('/')
  });

app.get('/', (req, res) => {
    if(req.user){
        let str = '';
        for(let i = 0; i < 5; i++){
            str += Math.round(Math.random() * 100) + '; ';
        }
        res.send('Hello ' + req.user.displayName + ' ' + str);
    }
    else{
        res.send('hello stranger');
    }
});

app.listen(3000, () => {
    console.log('server is running')
})
const express = require('express');
const path = require('path');
const app = express();
const { title } = require('process');
const { Router } = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const dotenv = require('dotenv');

dotenv.config();

const { PORT, KEY_SESSION } = process.env;
const store = session.MemoryStore();
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

require('dotenv').config();
require('./routes/passport-config');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
});
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page', name: 'User' });
});
app.get('/news', (req, res) => {
    res.render('news', { title: 'News Page', name: 'User' });
});
app.get('/status', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'ok'
    })
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}), (req, res) => {
    try {
        res.send('login successfully');
    }
    catch (error) {
        res.json({
            error: error.stack
        })
    }
})

app.use('/img', express.static(path.join(__dirname, 'views/img')));
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    saveUninitialized: false,
    secret: KEY_SESSION,
    resave: false,
    cookie: {
        maxAge: 1000 * 10
    },
    store
}))

const user = {
    username: 'annoystick',
    password: '123'
}

passport.use(new LocalStrategy( ( username, password, done) => {
    console.log('username:::${username}, pass:::${password}');
    if(username === user.username && password === user.password){
        return done(null, {
            username,
            password,
            active: true
        });
    } else {
        return done ((null, false, {message: 'Incorrect username or password'}))
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.username);
});

passport.deserializeUser((username, done) => {
    if (username === user.username) {
        done(null, user);
    } else {
        done(new Error('User not found'));
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  
const express = require('express');
const path = require('path');
const app = express();
const { title } = require('process');
const { Router } = require('express');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const mysql = require('mysql');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

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
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }), (req, res) => {
    // Xử lý bổ sung nếu cần thiết (chạy sau khi xác thực thành công)
    console.log('Xác thực Google thành công!');
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
    secret: 'your-secret-key', // Khóa bí mật để mã hóa session
    resave: false, // Cho phép ghi đè session hiện có
    saveUninitialized: false // Lưu session chỉ khi có thay đổi
  }));


const user = {
 username: 'annoystick',
 password: '123'
}



passport.use(new GoogleStrategy({
    // ...
}, (accessToken, refreshToken, profile, done) => {
    console.log('Thông tin profile Google:', profile);
    req.session.user = profile; // Lưu trữ thông tin profile Google vào session
    done(null, profile);
}));

passport.use(new FacebookStrategy({
    // ...
}, (accessToken, refreshToken, profile, done) => {
    console.log('Thông tin profile Facebook:', profile);
    req.session.user = profile; // Lưu trữ thông tin profile Facebook vào session
    done(null, profile);
}));


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

// Cấu hình Passport cho Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:' + PORT + '/auth/google/callback',
    scope: ['profile', 'email'] // Yêu cầu quyền truy cập hồ sơ và email
}, (accessToken, refreshToken, profile, done) => {
    console.log('Thông tin profile Google:', profile);
    // Lưu trữ thông tin profile người dùng trong session hoặc database
    // ...
    done(null, profile);
}));

// Cấu hình Passport cho Facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: 'http://localhost:' + PORT + '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails'] // Yêu cầu quyền truy cập ID, tên hiển thị và email
}, (accessToken, refreshToken, profile, done) => {
    console.log('Thông tin profile Facebook:', profile);
    // Lưu trữ thông tin profile người dùng trong session hoặc database
    // ...
    done(null, profile);
}));

// Tạo tuyến xử lý xác thực Google
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Tạo tuyến xử lý callback xác thực Google
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }), (req, res) => {
    // Xử lý bổ sung nếu cần thiết (chạy sau khi xác thực thành công)
    console.log('Xác thực Google thành công!');
  });

// Tạo tuyến xử lý xác thực Facebook
app.get('/auth/facebook', passport.authenticate('facebook'));

// Tạo tuyến xử lý callback xác thực Facebook
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/login'
}), (req, res) => {
  // Xử lý bổ sung nếu cần thiết (chạy sau khi xác thực thành công)
  console.log('Xác thực Facebook thành công!');
});


// ... (phần còn lại của code app.js)

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});

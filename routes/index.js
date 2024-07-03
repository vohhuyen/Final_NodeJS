// var express = require('express');
// var router = express.Router();
// var adminRouter = require('')

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// adminRouter.get('/dash', function(req, res, next) {
//   res.render('admin/dashboard');
// });
// router.get('/user-manager', function(req, res, next) {
//   res.render('admin/user/user');
// });
// router.get('/hotel-manager', function(req, res, next) {
//   res.render('admin/hotel/hotel');
// });

// module.exports = router;

// routes/index.js

const express = require('express');
const adminRouter = require('./admin');
const clientRouter = require('./client');

const router = express.Router();

// Đăng ký các router con
router.use('/admin', adminRouter);
router.use('/client', clientRouter);

module.exports = router;


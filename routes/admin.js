// routes/admin.js

const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    res.locals.layout = 'layouts/layout_admin';
    next();
  });
router.get('/dash', (req, res, next) => {
  res.render('admin/dashboard', { title: 'Admin Dashboard' });
});
router.get('/user-manager', function(req, res, next) {
    res.render('admin/user/user');
});
router.get('/hotel-manager', function(req, res, next) {
    res.render('admin/hotel/hotel');
});
router.get('/hotel-detail', function(req, res, next) {
    res.render('admin/hotel/detail_hotel');
});
router.get('/hotel-edit', function(req, res, next) {
    res.render('admin/hotel/edit_hotel');
});
router.get('/hotel-create', function(req, res, next) {
    res.render('admin/hotel/create_hotel');
});

module.exports = router;

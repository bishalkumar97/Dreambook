const express = require('express');

const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const bookRoute = require('./book.route');
const syncRoute = require('./sync.route');
const orderRoute = require('./order.route'); // ✅ NEW LINE

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/books', bookRoute);
router.use('/sync', syncRoute);
router.use('/orders', orderRoute); // ✅ REGISTER THE NEW ORDER ROUTE

module.exports = router;

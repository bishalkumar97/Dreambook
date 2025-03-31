const express = require('express');

const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const bookRoute = require('./book.route');
const syncRoute = require('./sync.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/books', bookRoute);
router.use('/sync', syncRoute);

module.exports = router;

const express = require('express');

const { firebaseAuth } = require('../../middlewares/firebaseAuth');

const { bookController } = require('../../controllers');
const { fileUploadService } = require('../../microservices');

const router = express.Router();

router.post(
    '/',
    firebaseAuth('All'),
    fileUploadService.multerUpload.single('coverImage'),
    bookController.addBook
);

router.get(
    '/',
    firebaseAuth('All'),
    bookController.getAllBooks
);

router.get(
    '/:id',
    firebaseAuth('All'),
    bookController.getBookById
);

router.delete(
    '/:id',
    firebaseAuth('All'),
    bookController.deleteBookById
);

router.patch(
    '/:id',
    firebaseAuth('All'),
    fileUploadService.multerUpload.single('coverImage'),
    bookController.updateBookById
);

module.exports = router;

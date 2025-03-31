const express = require('express');

const validate = require('../../middlewares/validate');
const { firebaseAuth, generateToken } = require('../../middlewares/firebaseAuth');
const { authValidation } = require('../../validations');
const { fileUploadService } = require('../../microservices');

const { authController } = require('../../controllers');

const router = express.Router();

router.post('/login', firebaseAuth('All'), authController.loginUser);

router.post(
  '/register',
  firebaseAuth('User'),
  authController.registerUser
);

router.post(
  '/register-admin',
  firebaseAuth('Admin'),
  authController.registerUser
);

router.post(
  '/add-author',
  firebaseAuth('Admin,Employee'),
  authController.addAuthor
);

router.post(
  '/add-employee',
  firebaseAuth('Admin'),
  authController.addEmployee
);

router.post("/generate-token/:uid", generateToken);

module.exports = router;

const express = require('express');

const validate = require('../../middlewares/validate');
const { firebaseAuth } = require('../../middlewares/firebaseAuth');
const userValidation = require('../../validations/user.validation');

const { userController } = require('../../controllers');
const { fileUploadService } = require('../../microservices');

const router = express.Router();

router.get(
  '/',
  firebaseAuth('Admin,Employee'),
  userController.getAllUsers
);

router.get(
  '/:id',
  firebaseAuth('Admin,Employee,Author'),
  userController.getUserById
);

router.get(
  '/get/me',
  firebaseAuth('All'),
  userController.getMe
);

// for updating userDetails
router.patch(
  '/:id',
  firebaseAuth('Admin,Employee,Author'),
  userController.updateUser
);

router.patch(
  '/author/:userId',
  firebaseAuth('Admin,Employee,Author'),
  userController.updateAuthor
);

router.patch(
  '/employee/:userId',
  firebaseAuth('Admin,Employee,Author'),
  userController.updateEmployee
);

router.patch(
  '/:userId/block-unblock',
  firebaseAuth('Admin'),
  validate(userValidation.blockUser),
  userController.blockUnblockUser
);

// for deleting a user
router.delete('/delete/me', validate(userValidation.deleteUser), firebaseAuth('All'), userController.deleteUser);

// to soft delete a user
router.post('/delete/:userId', validate(userValidation.deleteUser), firebaseAuth('All'), userController.softDeleteUser);

module.exports = router;

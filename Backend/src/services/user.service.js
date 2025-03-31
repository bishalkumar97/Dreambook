const { User, Admin, Author, Employee } = require('../models');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { getAllData } = require("../utils/getAllData");
const { fileUploadService } = require('../microservices');


const userValidator = user => {
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found.');
  }
  // else if (user.isDeleted) {
  //   throw new ApiError(httpStatus.FORBIDDEN, 'User account has been deleted.');
  // } else if (user.isBlocked) {
  //   throw new ApiError(httpStatus.FORBIDDEN, 'User has been blocked.');
  // }
};

async function getUserById(id) {
  const user = await User.findById(id);
  return user;
}

async function getUsers(filters, options) {
  return await User.paginate(filters, options);
}

async function updateUserById(id, newDetails, profileImage = null) {
  const user = await User.findById(id);
  userValidator(user);
  let updates = { ...newDetails };
  return await User.findByIdAndUpdate(id, updates, { new: true });

}

async function updateAuthor(id, newDetails) {
  const user = await User.findById(id);
  userValidator(user);
  let updates = { ...newDetails };
  return await Author.findByIdAndUpdate(id, updates, { new: true });

}

async function updateEmployee(id, newDetails) {
  const user = await User.findById(id);
  userValidator(user);
  let updates = { ...newDetails };
  return await Employee.findByIdAndUpdate(id, updates, { new: true });

}

async function deleteUserById(id) {
  try {
    await User.findByIdAndDelete(id);
    return true;
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to delete the user');
  }
}

async function updatePreferencesById(id, newPrefs) {
  const user = await User.findById(id);
  user.preferences = {
    ...user.preferences,
    ...newPrefs,
  };
  // any other fields if you have
  await user.save();
  return user;
}

async function getAllUsers(query, populateConfig) {
  const data = await getAllData(User, query, populateConfig)
  return data;
}

module.exports = {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updatePreferencesById,
  getAllUsers,
  updateAuthor,
  updateEmployee
};

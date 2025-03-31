const { User, Admin, Author, Employee } = require('../models');

async function createUser(user) {
  return User.create(user);
}

async function getUserByFirebaseUId(id) {
  return User.findOne({ firebaseUid: id });
}

async function createAdmin(admin) {
  return await Admin.create(admin)
}

async function createAuthor(author) {
  return await Author.create(author)
}

async function createEmployee(employee) {
  return await Employee.create(employee)
}

module.exports = {
  createUser,
  getUserByFirebaseUId,
  createAdmin,
  createAuthor,
  createEmployee
};

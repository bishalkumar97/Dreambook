const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const getAllUsers = catchAsync(async (req, res) => {
  const populateConfig = [
  ]
  if (req.query.search === '') {
    delete req.query.search;
  }
  if (req.query.search) {
    let search = req.query.search;
    delete req.query.search;
    let qStringName = searchQuery(search, "name");
    let qStringEmail = searchQuery(search, "email");
    req.query = { ...req.query, $or: qStringName.concat(qStringEmail) }
  }
  const users = await userService.getAllUsers(req.query, populateConfig)

  res.status(200).json({
    status: true,
    message: 'All users',
    data: users
  })
})

const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).send({ status: true, message: "user details", data: user });
});

const getMe = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user._id);
  res.status(200).send({ status: true, message: "user details", data: user });
});

const updateUser = catchAsync(async (req, res) => {
  const updatedUser = await userService.updateUserById(req.user._id, req.body, req.file);
  res.status(200).json({ status: true, message: 'Your details are updated', data: updatedUser });
});

const updateAuthor = catchAsync(async (req, res) => {
  const updatedAuthor = await userService.updateAuthor(req.params.userId, req.body);
  res.status(200).json({ status: true, message: 'Author details are updated', data: updatedAuthor });
});

const updateEmployee = catchAsync(async (req, res) => {
  const updatedAuthor = await userService.updateEmployee(req.params.userId, req.body);
  res.status(200).json({ status: true, message: 'Employee details are updated', data: updatedAuthor });
});

const blockUnblockUser = catchAsync(async (req, res) => {
  const updatedUser = await userService.updateUserById(req.params.userId, req.body, req.file);
  res.status(200).json({ status: true, message: `User updated`, data: updatedUser });
});

const deleteUser = catchAsync(async (req, res) => {
  const updatedUser = await userService.updateUserById(req.user._id, req.body, req.file);
  res.status(200).json({ status: true, message: `User deleted`, data: updatedUser });
});

const updatePreferences = catchAsync(async (req, res) => {
  const updatedUser = await userService.updatePreferencesById(req.user._id, req.body);
  res.status(200).send({ data: updatedUser, message: 'Your preferences are updated' });
});

const softDeleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  if (req.user.__t !== 'Admin' && userId !== req.user._id.toString()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Sorry, you are not authorized to do this');
  }
  await userService.markUserAsDeletedById(req.params.userId);
  res.status(200).send({
    message: 'User has been removed successfully.',
  });
});

module.exports = {
  deleteUser,
  updateUser,
  softDeleteUser,
  updatePreferences,
  getAllUsers,
  getUserById,
  getMe,
  blockUnblockUser,
  updateAuthor,
  updateEmployee
};

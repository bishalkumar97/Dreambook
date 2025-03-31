const Joi = require('joi');
const { objectId, dbOptionsSchema, fileSchema } = require('./custom.validation');
const { imageTypes, imgTypeToExtension } = require('../constants');

const baseUserSchema = {
  name: Joi.string()
    .trim()
    .optional(),
  phone: Joi.string()
    .trim()
    .optional(),
  dob: Joi.string()
    .trim()
    .optional(),
  avatarDisplayType: Joi.string()
    .trim()
    .valid("fullScreen", "halfScreen")
    .optional(),
  notificationPreferences: Joi.object({
    pushNotifications: Joi.boolean().optional(),
  }).optional(),
};

const updateUser = {
  body: Joi.object().keys({
    name: Joi.string().trim(),
    dob: Joi.date().iso(),
    phone: Joi.string().trim(),
    email: Joi.string().trim(),
  }),
};

const updateUserPreferences = {
  body: Joi.object().keys({
    notificationEnabled: Joi.boolean(),
    locationShared: Joi.boolean(),
  }),
};


const updateDetails = {
  file: Joi.object().keys(fileSchema('Profile Image', imageTypes, Object.values(imgTypeToExtension))),
  body: Joi.object().keys(baseUserSchema),
};

const blockUser = {
  body: Joi.object().keys({
    isBlocked: Joi.boolean()
  }),
};

const deleteUser = {
  body: Joi.object().keys({
    isDeleted: Joi.boolean(),
    deleteReason: Joi.string(),
  }),
};

module.exports = {
  updateUser,
  deleteUser,
  updateUserPreferences,
  updateDetails,
  blockUser
};

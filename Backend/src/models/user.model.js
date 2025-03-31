const mongoose = require('mongoose');
const { paginate } = require('./plugins/paginate');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'employee', 'author'],
      default: 'author'
    },
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    firebaseSignInProvider: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);


const authorSchema = new mongoose.Schema(
  {
    accountHolderName: {
      type: String,
      default: ""
    },
    accountNumber: {
      type: String,
      default: ""
    },
    bankName: {
      type: String,
      default: ""
    },
    ifscCode: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const employeeSchema = new mongoose.Schema(
  {

  },
  { timestamps: true }
);

const adminSchema = new mongoose.Schema(
  {
    permissions: {
      type: {
        userListing: Boolean,
        courseUpload: Boolean,
        roleManagement: Boolean,
        analytics: Boolean,
        policy: Boolean
      },
      default: {
        userListing: false,
        courseUpload: false,
        roleManagement: false,
        analytics: false,
        policy: false
      },
    },
  },
  { timestamps: true }
);

userSchema.plugin(paginate);
authorSchema.plugin(paginate);
adminSchema.plugin(paginate);

const User = mongoose.model('User', userSchema);
const Author = User.discriminator('Author', authorSchema);
const Employee = User.discriminator('Employee', employeeSchema);
const Admin = User.discriminator('Admin', adminSchema);

module.exports = {
  User,
  Admin,
  Author,
  Employee
};

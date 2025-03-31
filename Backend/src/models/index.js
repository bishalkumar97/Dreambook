const { User, Admin, Author, Employee } = require('./user.model');
const { Book } = require("./book.model");
const Order = require('./order.model');
module.exports = {
  User,
  Admin,
  Author,
  Employee,
  Order,
  Book
};

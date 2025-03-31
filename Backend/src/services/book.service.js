const { Book } = require('../models');
const httpStatus = require('http-status');
const { fileUploadService } = require('../microservices');

const ApiError = require('../utils/ApiError');
const { getAllData } = require("../utils/getAllData");

async function addBook(book) {
    return await Book.create(book);
}

async function getBookById(id) {
    return await Book.findById(id).populate({ path: "author" });
}

// async function updateUserById(id, newDetails, profileImage = null) {
//   const user = await User.findById(id);
//   userValidator(user);
//   let updates = { ...newDetails };
//   return await User.findByIdAndUpdate(id, updates, { new: true });

// }

async function updateBookById(id, newDetails) {
    return await Book.findByIdAndUpdate(id, newDetails, { new: true });
}

async function deleteBook(id, newDetails) {
    return await Book.findByIdAndDelete(id);
}

async function getAllBooks(query, populateConfig) {
    const data = await getAllData(Book, query, populateConfig)
    return data;
}

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBook
    //   getUserById,
    //   updateUserById,
    //   getAllUsers,
    //   updateAuthor,
};

const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bookService } = require('../services');
const { fileUploadService } = require('../microservices');

const addBook = catchAsync(async (req, res) => {
    if (req.body.platforms) {
        req.body.platforms = JSON.parse(req.body.platforms);
    }
    if (req.file) {
        const [coverImage] = await fileUploadService.s3Upload([req.file], 'coverImages').catch(err => {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to upload profile picture');
        });
        let book = await bookService.addBook({ ...req.body, coverImage })
        return res.status(200).send({ status: true, message: "Book added successfully", data: book });
    } else {
        return res.status(400).json({ status: false, message: "Please pass cover image" })
    }
});

const getAllBooks = catchAsync(async (req, res) => {
    const user = req.user;
    const populateConfig = [
        { path: "author", select: "_id name email" }
    ]
    if (req.query.search === '') {
        delete req.query.search;
    }
    if (req.query.search) {
        let search = req.query.search;
        delete req.query.search;
        let qStringTitile = searchQuery(search, "title");
        let qStringSubTitle = searchQuery(search, "subtitle");
        let qStringIsbnNumber = searchQuery(search, "isbnNumber");
        req.query = { ...req.query, $or: qStringTitile.concat(qStringSubTitle).concat(qStringIsbnNumber) }
    }
    if (user.role === "author") {
        req.query.author = user._id
    }
    const books = await bookService.getAllBooks(req.query, populateConfig)

    res.status(200).json({
        status: true,
        message: 'All books',
        data: books
    })
})

const getBookById = catchAsync(async (req, res) => {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
        return res.status(400).json({
            status: false,
            message: "Book not foud"
        })
    }
    return res.status(200).json({
        status: true,
        message: "Book details",
        data: book
    })
})

const updateBookById = catchAsync(async (req, res) => {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
        return res.status(400).json({
            status: false,
            message: "Book not foud"
        })
    }
    if (req.file) {
        const [coverImage] = await fileUploadService.s3Upload([req.file], 'coverImages').catch(err => {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to upload profile picture');
        });
        req.body = { ...req.body, coverImage }
    }
    if (req.body.platforms) {
        req.body.platforms = JSON.parse(req.body.platforms);
    }
    const updatedBook = await bookService.updateBookById(req.params.id, req.body);
    return res.status(200).json({
        status: true,
        message: "Book updated successfully",
        data: updatedBook
    })
})

const deleteBookById = catchAsync(async (req, res) => {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
        return res.status(400).json({
            status: false,
            message: "Book not foud"
        })
    }
    const deletedBook = await bookService.getBookById(req.params.id);
    return res.status(200).json({
        status: true,
        message: "Book deleted successfully",
        data: deletedBook
    })
})

module.exports = {
    addBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
}
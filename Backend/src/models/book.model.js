const mongoose = require('mongoose');
const { paginate } = require('./plugins/paginate');

const bookSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author",
            required: true
        },
        title: {
            type: String,
            trim: true,
            required: true,
        },
        subtitle: {
            type: String,
            trim: true,
            default: ""
        },
        coverImage: {
            type: {
                key: String,
                url: String,
            },
            default: null,
        },
        description: {
            type: String,
            default: ""
        },
        isbnNumber: {
            type: String,
            required: true,
        },
        categories: {
            type: [String],
            default: []
        },
        bindingSize: {
            type: [String],
            enum: ["paperBack", "hardCover", "ebook"],
            default: []
        },
        language: {
            type: String,
            default: "english"
        },
        price: {
            type: Number,
            default: 0
        },
        platforms: {
            type: [
                {
                    platform: {
                        type: String,
                        enum: ["amazon", "flipkart", "dream", "kindle"],
                        required: true
                    },
                    royalty: {
                        type: Number,
                        default: 0
                    }
                }
            ],
            default: []
        },
        status: {
            type: String,
            enum: ["approved", "pending", "rejected"],
            default: "pending"
        }
    },
    { timestamps: true }
);

bookSchema.plugin(paginate);

const Book = mongoose.model('Book', bookSchema, 'Book');

module.exports = {
    Book
};

platforms: [{ "platform": "amazon", "royality": 50 }]
// This function syncs basic book info into your book DB
const { Book } = require('../models/book.model');

const syncBookFromExternalSource = async (data, platform) => {
  try {
    await Book.findOneAndUpdate(
      { isbnNumber: data.id },
      {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        coverImage: data.cover ? { key: data.id, url: data.cover } : null,
        platforms: [{ platform, royalty: 50 }],
        status: "approved",
      },
      { upsert: true }
    );
    console.log(`✅ Synced book from ${platform}: ${data.title}`);
  } catch (err) {
    console.error(`❌ Failed to sync book: ${data.title}`, err);
  }
};

module.exports = { syncBookFromExternalSource };

// ✅ src/services/order.service.js
const { Book } = require('../models/book.model');
const Order = require('../models/order.model');

const getOrdersByBookId = async (bookId) => {
  // Step 1: Get the Book using MongoDB ObjectId
  const book = await Book.findById(bookId);
  if (!book) throw new Error('Book not found');

  const title = book.title.toLowerCase();

  // Step 2: Fetch orders whose line_items.name includes the book title
  const orders = await Order.find({
    line_items: {
      $elemMatch: {
        name: { $regex: new RegExp(title, 'i') }
      }
    }
  });

  // Step 3: Transform the orders into platform-wise sales summary
  const summary = {};
  orders.forEach(order => {
    order.line_items.forEach(item => {
      if (item.name.toLowerCase().includes(title)) {
        const platform = item.platform;
        if (!summary[platform]) {
          summary[platform] = {
            platform,
            royalty: 0, // you can populate real royalty logic later
            sales: 0,
            totalEarnings: 0,
            platformEarnings: 0,
            returns: 0, // logic can be added based on status
            returnRoyalty: 0,
            totalToPay: 0
          };
        }

        summary[platform].sales += item.quantity;
        summary[platform].totalEarnings += parseFloat(item.total);
        summary[platform].totalToPay += parseFloat(item.total); // example logic
      }
    });
  });

  return Object.values(summary);
};

module.exports = {
  getOrdersByBookId,
};
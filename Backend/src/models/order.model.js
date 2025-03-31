// models/order.model.js
const mongoose = require('mongoose');

const lineItemSchema = new mongoose.Schema(
  {
    name: String,
    quantity: Number,
    price: Number,
    total: Number,
    platform: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    status: { type: String },
    total: { type: Number },
    currency: { type: String },
    date_created: { type: Date },
    line_items: [lineItemSchema],
    source: { type: String, enum: ['amazon', 'woocommerce'] },
    message: { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema, 'Order');

module.exports = Order;

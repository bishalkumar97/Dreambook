// ✅ src/routes/v1/order.route.js
const express = require('express');
const router = express.Router();

const { getOrdersByBookId } = require('../../services/order.service');

router.get('/', async (req, res) => {
  try {
    const { bookId } = req.query;
    if (!bookId) {
      return res.status(400).json({ error: 'Missing bookId in query' });
    }

    const orders = await getOrdersByBookId(bookId);
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;



//sync.route.js
const express = require('express');
const router = express.Router();

const {
  fetchAmazonOrdersAndProducts,
  fetchWooCommerceOrdersAndProducts,
} = require('../../services/syncBooksAndOrders');

router.get('/sync-all', async (req, res) => {
  try {
    await fetchAmazonOrdersAndProducts();
    await fetchWooCommerceOrdersAndProducts();
    res.json({ message: '✅ Synced both Amazon and WooCommerce successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Sync failed', details: err.message });
  }
});

module.exports = router;

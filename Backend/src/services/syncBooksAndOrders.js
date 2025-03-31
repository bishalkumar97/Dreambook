// Backend/services/syncBooksAndOrders.js
const axios = require("axios");
// const { default: SellingPartnerAPI } = require("amazon-sp-api");
const SellingPartnerAPI = require("amazon-sp-api");

const { Book } = require("../models/book.model");
const Order  = require("../models/order.model");
const { syncBookFromExternalSource } = require("./syncBookFromSource");
require("dotenv").config();

// Amazon SP-API Client
const amazonClient = new SellingPartnerAPI({
  region: "eu",
  refresh_token: process.env.AMAZON_REFRESH_TOKEN,
  credentials: {
    SELLING_PARTNER_APP_CLIENT_ID: process.env.AMAZON_CLIENT_ID,
    SELLING_PARTNER_APP_CLIENT_SECRET: process.env.AMAZON_CLIENT_SECRET,
  },
});

// WooCommerce API config
const wooClient = axios.create({
  baseURL: `${process.env.WC_STORE_URL}/wp-json/wc/v3`,
  auth: {
    username: process.env.WC_CONSUMER_KEY,
    password: process.env.WC_CONSUMER_SECRET,
  },
});

// ================= AMAZON SYNC =================
async function fetchAmazonOrdersAndProducts() {
  const ordersResponse = await amazonClient.callAPI({
    operation: "getOrders",
    endpoint: "orders",
    query: {
      MarketplaceIds: ["A21TJRUUN4KGV"],
      CreatedAfter: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  });

  const orders = ordersResponse.Orders || [];

  for (let order of orders) {
    const itemsRes = await amazonClient.callAPI({
      operation: "getOrderItems",
      endpoint: "orders",
      path: { orderId: order.AmazonOrderId },
    });
    const items = itemsRes.OrderItems || [];

    const lineItems = items.map((item) => ({
      name: item.Title || "Amazon Book",
      quantity: item.QuantityOrdered,
      price: item.ItemPrice?.Amount || "0.00",
      total: (parseFloat(item.ItemPrice?.Amount || 0) * item.QuantityOrdered).toFixed(2),
      platform: "amazon"
    }));

    await Order.findOneAndUpdate(
      { id: order.AmazonOrderId },
      {
        id: order.AmazonOrderId,
        status: order.OrderStatus,
        total: order.OrderTotal?.Amount,
        currency: order.OrderTotal?.CurrencyCode,
        date_created: order.PurchaseDate,
        line_items: lineItems,
        source: "amazon",
        message: "",
      },
      { upsert: true }
    );

    for (const item of items) {
      const product = await amazonClient.callAPI({
        operation: "getCatalogItem",
        endpoint: "catalogItems",
        path: { asin: item.ASIN },
        query: { marketplaceIds: ["A21TJRUUN4KGV"] },
      });

      const summary = product.summaries?.[0];
      const image = product.images?.[0]?.images?.[0]?.link || "";
      const price = await fetchAmazonPrice(item.ASIN);

      await Book.findOneAndUpdate(
        { isbnNumber: item.ASIN },
        {
          title: summary?.itemName || "Amazon Book",
          subtitle: "",
          coverImage: image ? { key: item.ASIN, url: image } : null,
          description: product.attributes?.product_description?.[0]?.value || "",
          isbnNumber: item.ASIN,
          categories: [],
          bindingSize: ["paperBack"],
          language: "english",
          price: parseFloat(price),
          platforms: [{ platform: "amazon", royalty: 50 }],
          status: "approved",
          author: null // Set properly if you plan to link to authors
        },
        { upsert: true, new: true }
      );

      await syncBookFromExternalSource({
        id: item.ASIN,
        title: summary?.itemName,
        price: price,
        description: product.attributes?.product_description?.[0]?.value || "",
        cover: image,
      }, "amazon");
    }
  }
}

async function fetchAmazonPrice(asin) {
  try {
    const response = await amazonClient.callAPI({
      operation: "getItemOffers",
      endpoint: "productPricing",
      query: {
        MarketplaceId: "A21TJRUUN4KGV",
        ItemCondition: "New",
      },
      path: { Asin: asin },
    });
    return response.Offers?.[0]?.ListingPrice?.Amount || "0.00";
  } catch (e) {
    return "0.00";
  }
}

// ================= WOOCOMMERCE SYNC =================
async function fetchWooCommerceOrdersAndProducts() {
  const ordersRes = await wooClient.get("/orders");
  const orders = ordersRes.data || [];

  for (let order of orders) {
    const lineItems = order.line_items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.total,
      platform: "woocommerce"
    }));

    await Order.findOneAndUpdate(
      { id: String(order.id) },
      {
        id: String(order.id),
        status: order.status,
        total: order.total,
        currency: order.currency,
        date_created: order.date_created,
        line_items: lineItems,
        source: "woocommerce",
        message: order.customer_note || "",
      },
      { upsert: true }
    );
  }
}

module.exports = {
  fetchAmazonOrdersAndProducts,
  fetchWooCommerceOrdersAndProducts,
};
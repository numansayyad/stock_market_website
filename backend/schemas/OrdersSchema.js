const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  name: String,
  qty: Number,
  price: Number,
  mode: String,
  date: { type: Date, default: Date.now },
});

module.exports = { OrdersSchema };

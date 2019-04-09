const mongoose = require('mongoose');
const FruitSchema = new mongoose.Schema({
  name: String,
  imgPath: String,
  price: String,
  un_fit: String,
  best_busy: String,
  description: String,
  up_time_season: String,
  up_time_month: String,
  keep_fresh: String,
  hot: String,
  belong_province: Number,
  belong_city: Number,
  belong_region: Number,
  price_min: Number,
  price_max: Number,
  tasty: String,
  nutrition: String,
  created_at: Date,
  isBanner: Boolean,
})
module.exports = mongoose.model('Fruits', FruitSchema)
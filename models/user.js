const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  userName: String,
  passwd: String,
  email: String,
  verify_code: String,
  created_at: Date,
  last_login: Date,
  watched_list: Array,
  admired_list: Array,
  collected_list: Array,
  best_recommand: Array,
  token: String
}, {collection: 'user', versionKey: false});
module.exports = mongoose.model('user', UserSchema);
const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
  name: String,
  passwd: String,
  created_at: String,
  last_login: Date
})
module.exports = mongoose.model('admin'. AdminSchema)
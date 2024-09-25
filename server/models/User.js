
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  nationality: String,
  address: String,
  documentPath: String,
});

module.exports = mongoose.model('User', UserSchema);

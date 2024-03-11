const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    phone: String,
    male: String,
    isDeleted: Boolean,
    animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }]
  }, {
    timestamps: true,
  })
  
  const User = mongoose.model('User', userSchema);

  module.exports = {
    userSchema,
    User
  }
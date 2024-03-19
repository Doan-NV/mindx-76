const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    username: String,
    password: String,
    address: String,
    phone: String,
    male: String,
    isDeleted: {
      type: Boolean,
      default: false
    },
    animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }]
  }, {
    timestamps: true,
  })
  
  const User = mongoose.model('User', userSchema);

  module.exports = {
    userSchema,
    User
  }
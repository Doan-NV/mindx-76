
const mongoose = require('mongoose');
const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  isDied: {
    type: Boolean,
    required: true,
    default: false,
  },
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},
  {
    timestamps: true,
  }
)

const Animal = mongoose.model('Animal', animalSchema);

module.exports = {
  animalSchema,
  Animal
}
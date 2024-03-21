const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true,
    },
    name: String,
    birth: String,
    address: String,
    nation: String,
    password: String,
    isDelete: {
      type: Boolean,
      default: false,
    },
    profile: { type: mongoose.Types.ObjectId, ref: "Profile" },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  UserModel,
  UserSchema
}
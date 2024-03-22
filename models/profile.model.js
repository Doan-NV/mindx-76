const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    skill: {
      type: Array,
      item: {
        type: String,
      },
    },
    hobby: String,
    ami: {
      type: Array,
      item: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);
const ProfileModel = mongoose.model("Profile", ProfileSchema);

module.exports = {
  ProfileModel,
  ProfileSchema
};

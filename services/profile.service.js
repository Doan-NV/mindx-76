const { ProfileModel } = require("../models/profile.model");

const createProfile = async (profileData) => {
    const profile = await ProfileModel.create(profileData);
    return profile;
}
const findOneProfile = async (query) => {
    const profile = await ProfileModel.findOne(query).exec();
    return profile;
}

const updateProfile = async (query, body) => {
    const profile = await ProfileModel.findOneAndUpdate(query, body, { new: true }).exec();
    return profile;
}

const getDetailUserProfile = async (query) => {
    const user = await ProfileModel.findOne(query).populate('user').select("-password").exec();
    return user;
}

module.exports = {
    createProfile,
    findOneProfile,
    updateProfile,
    getDetailUserProfile
}


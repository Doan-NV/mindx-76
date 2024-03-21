const { UserModel } = require("../models/user.model");

const findAllUsers = async () => {
    const users = await UserModel.find().lean();
    return users;
}

const createUser = async (body) => {
    const user = await UserModel.create(body);
    return user;
}

const updateUser = async (id, body) => {
    const user = await UserModel.findByIdAndUpdate(id, body, { new: true }).lean();
    return user;
}


const findOneUser = async (query) => {
    const user = await UserModel.findOne(query).select("-password").exec();
    return user;
}

const getDetailUserProfile = async (query) => {
    const user = await UserModel.findOne(query).populate('profile').select("-password").exec();
    return user;
}

module.exports = {
    findAllUsers,
    createUser,
    updateUser,
    findOneUser,
    getDetailUserProfile
}
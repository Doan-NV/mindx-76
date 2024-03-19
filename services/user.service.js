const { User } = require("../models/user.model");

const findAllUsers = async () => {
    const users = await User.find().lean();
    return users;
}

const createUser = async (body) => {
    const { name, age, username, password, address, phone, male } = body;
    const user = await User.create({
        name,
        age,
        address,
        phone,
        username,
        password,
        male
    });
    return user;
}

const updateUser = async (id, body) => {
    const { name, age, address, phone } = body;
    const user = await User.findByIdAndUpdate(id, {
        name,
        age,
        address,
        phone,
    }, { new: true });
    return user;
}

const findOneUser = async (query) => {
    console.log("🚀 ~ findOneUser ~ query:", query)
    const user = await User.findOne(query);
    return user;
}

module.exports = {
    findAllUsers,
    createUser,
    updateUser,
    findOneUser
}
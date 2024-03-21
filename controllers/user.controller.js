const express = require('express');
const jwt = require('jsonwebtoken');
const { findOneUser, createUser, getDetailUserProfile } = require('../services/user.service');
const authMiddleware = require('../middleware/validateToken.middleware');
const userRouter = express.Router();

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await findOneUser({ email, password });
    if (!user) {
        return res.status(401).json({ message: "username or password is wrong" });
    } else {
        const { email, name, birth, address, nation, _id } = user;
        const payload = {
            email,
            name,
            birth,
            address,
            nation,
            _id: _id.toString()
        };
        const token = jwt.sign(payload, "privateKey", { expiresIn: "1h" });
        res.json({ token });
    }
});


// create user
userRouter.post('/register', async (req, res) => {
    const { password, email, name, birth, address, nation } = req.body;
    const existingUser = await findOneUser({ email });
    if (existingUser) {
        return res.status(400).json({ message: "email already exists" });
    }
    const user = await createUser({ password, email, name, birth, address, nation });
    res.json(user);
});

// get detail user profile
userRouter.get('/detail-profile', authMiddleware, async (req, res) => {
    const { _id } = req.user;
    const user = await getDetailUserProfile({ _id });
    res.json(user);
});

module.exports = userRouter;
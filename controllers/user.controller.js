const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { findOneUser, createUser, getDetailUserProfile, findOne } = require('../services/user.service');
const authMiddleware = require('../middleware/validateToken.middleware');
const userRouter = express.Router();

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await findOne({ email });
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
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
        } else {
            res.status(400).json({ message: "password is incorrect" });
        }
    } else {
        res.status(400).json({ message: "email or password is incorrect" });
    }
});


// create user
userRouter.post('/register', async (req, res) => {
    const { password, email, name, birth, address, nation } = req.body;
    const existingUser = await findOneUser({ email });
    if (existingUser) {
        return res.status(400).json({ message: "email already exists" });
    }
    const passwordHashed = await bcrypt.hash(password, 10);
    await createUser({ password: passwordHashed, email, name, birth, address, nation });
    res.json({ message: "user created" });
});

// get detail user profile
userRouter.get('/detail-profile', authMiddleware, async (req, res) => {
    const { _id } = req.user;
    const user = await getDetailUserProfile({ _id });
    res.json(user);
});

module.exports = userRouter;
const express = require('express');
const authMiddleware = require('../middleware/validateToken.middleware');
const { createProfile, findOneProfile, updateProfile, getDetailUserProfile } = require('../services/profile.service');
const { updateUser } = require('../services/user.service');

const profileRouter = express.Router();
profileRouter.use(authMiddleware)
profileRouter.post('/create-profile', async (req, res) => {
    const { skill, hobby, ami } = req.body;
    const { _id } = req.user;
    const existingProfile = await findOneProfile({ userId: _id });
    if (existingProfile) {
        return res.status(400).json({ message: "profile already exists" });
    }
    const profile = await createProfile({ skill, hobby, ami, user: _id });
    updateUser(_id, { profile: profile._id });
    res.json(profile);
});

profileRouter.put('/edit-profile', async (req, res) => {
    const { skill, hobby, ami } = req.body;
    const { _id } = req.user;
    const profile = await updateProfile({ user: _id }, { skill, hobby, ami });
    res.json(profile);
});

// get detail user profile
profileRouter.get('/detail-profile', authMiddleware, async (req, res) => {
    const { _id } = req.user;
    const user = await getDetailUserProfile({ user: _id });
    res.json(user);
});

module.exports = profileRouter;
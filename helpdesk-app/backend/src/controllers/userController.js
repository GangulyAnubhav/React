import userModel  from '../models/userModel.js';

const createUser = async (req, res) => {
    try {
        const user = await userModel.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const user = await userModel.getUserByEmail(req.params.email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    createUser,
    getUserByEmail
};
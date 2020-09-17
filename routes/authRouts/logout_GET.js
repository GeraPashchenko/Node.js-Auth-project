const jwt_Auth = require('../../middleware/JWT_Auth');
const Token = require('../../models/blockedTokenModel');
const User = require('../../models/userModel');

module.exports.logout = async (req, res) => {
    let token = req.headers['authorization'];
    let user = req.user;

    try {
        await Token.create({token: token});
        res.json({message: `Logged out user with name < ${user.name} >`});

    } catch (e) {
        res.status(400).send(e);
    }
}
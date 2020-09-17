const User = require('../../models/userModel');

module.exports.userInfo = async (req, res) => {
    let token = req.headers['authorization'];

    try {
        let userDB = await User.findAll({where: {token: token}});

        if (!userDB.length) {
            res.status(400).send({message: "User doesn't exists!"});
        } else {
            res.json({id: userDB[0].id, name: userDB[0].name, email: userDB[0].email, phone: userDB[0].phone});
        }

    } catch (e) {
        res.status(400).send(e);
    }
}
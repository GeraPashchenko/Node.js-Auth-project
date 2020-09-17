const User = require('../../models/userModel');

module.exports.userDataChange = async (req, res) => {
    let token = req.headers['authorization'];
    let user = req.body;

    try {
        let userDB = await User.findAll({where: {token: token}});

        if (!userDB.length) {
            res.status(400).send({message: "User doesn't exists!"});
        } else {

            await User.update({
                name: user.name || req.user.name,
                email: user.email || req.user.email,
                phone: user.phone || req.user.phone,
            }, {where: {token: token}});

            res.json({
                id: userDB[0].id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            });
        }
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
}
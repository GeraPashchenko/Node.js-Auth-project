const User = require('../../models/userModel');

module.exports.userPasswordChange = async (req, res) => {
    let token = req.headers['authorization'];
    let user = req.body;
    let userToCheck = await User.findAll({where: {token: token}});
    let new_password = user.new_password || user.current_password;

    if (user.current_password !== userToCheck[0].password) {
        res.status(422).end("Wrong current password");
    }

    try {
        let userDB = await User.findAll({where: {token: token}});

        if (!userDB.length) {
            res.status(400).send({message: "User doesn't exists!"});
        } else {

            await User.update({
                password: new_password
            }, {where: {token: token}});

            res.json({
                id: userDB[0].id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: new_password
            });
        }
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
}
const User = require('../../models/userModel');
const jwt_Auth = require('../../middleware/JWT_Auth');

module.exports.signin = async (req, res) => {
    let user = req.body;

    try {
        let userDB = await User.findAll({where: {name: user.name}});

        if (!userDB.length) {
            res.status(400).send({message: "User doesn't exists!"});
        } else {
            let token = jwt_Auth.createToken(user);

            await User.update({token: token}, {where: {name: user.name}});

            res.json({token: token});
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
}
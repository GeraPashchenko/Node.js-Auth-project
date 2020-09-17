const jwt_Auth = require('../../middleware/JWT_Auth');
const User = require('../../models/userModel');

module.exports.signup = async (req, res) => {

    let user = req.body;
    let token = jwt_Auth.createToken(user);
    let refreshToken = jwt_Auth.createRefreshToken(user);

    let userDB = await User.findAll({where: {name: user.name}}).catch(err => {
        res.status(400).send(err);
    });

    if (userDB.length) {
        res.status(400).send({message: "This user is already exists!"});

    } else {
        try {
            await User.create({
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: user.password,
                token: token,
                refreshToken: refreshToken
            })

            res.json({token: token});

        } catch (e) {
            res.status(422).send(e.errors);
        }
    }
}
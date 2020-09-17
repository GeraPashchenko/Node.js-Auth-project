const jwt = require('jsonwebtoken');
const Token = require('../models/blockedTokenModel');
const User = require('../models/userModel');

module.exports.createToken = (user) => {
    return jwt.sign(user, process.env.SECRET_TOKEN);
}

module.exports.createRefreshToken = (user) => {
    return jwt.sign(user, process.env.SECRET_TOKEN_REFRESH);
}

module.exports.authenticateToken = async (req, res, next) => {
    let token = req.headers['authorization'];
    let user = {};

    if (token == null) return res.sendStatus(401);

    // check if token is blocked
    let BlockedToken = await Token.findAll({where: {token: token}});

    if (BlockedToken.length) {// if this token is blocked
        res.status(403).send({message: "Token is blocked!"});

    } else {
        try {
            user = jwt.verify(token, process.env.SECRET_TOKEN)
            req.user = user;
            next();

        } catch (e) {

            if (e instanceof jwt.TokenExpiredError) {

                let user = jwt.decode(token);

                let newToken = jwt.sign({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    password: user.password
                }, process.env.SECRET_TOKEN);

                try {
                    await User.update({token: token}, {where: {name: user.name}});

                    req.headers['authorization'] = newToken;

                    req.user = {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        password: user.password
                    };

                    next();

                } catch (e) {
                    res.status(400).send(e.errors);
                }

            } else if (e instanceof jwt.JsonWebTokenError) {
                console.log(e)
                res.status(403).send({message: "Token is invalid!"});
            }
        }
    }
}
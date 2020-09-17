const User = require('../../models/userModel');
const Op = require('sequelize').Op

module.exports.getUserByParams = async (req, res) => {
    let user = req.query || req.params;

    try {
        let userDB = await User.findAll({
            where: {
                [Op.or]: [
                    {name: user.name || ''},
                    {email: user.email || ''}
                ]
            }
        });

        if (!userDB.length) {
            res.status(400).send({message: "User doesn't exists!"});
        } else {
            res.json({id: userDB[0].id, name: userDB[0].name, email: userDB[0].email, phone: userDB[0].phone});
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
}
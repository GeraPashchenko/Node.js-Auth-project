const User = require('../../models/userModel');

module.exports.getUserById = async (req, res) => {
    let id = req.params.id;

    try {
        let user = await User.findAll({where: {id: id}});

        if (!user.length) {
            res.status(400).send({message: "User doesn't exists!"});
        } else {
            res.json({id: user[0].id, name: user[0].name, email: user[0].email, phone: user[0].phone});
        }

    } catch (e) {
        res.status(400).send(e);
    }
}
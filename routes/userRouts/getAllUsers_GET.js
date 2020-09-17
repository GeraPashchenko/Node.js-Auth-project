const User = require('../../models/userModel');

module.exports.getAllUsers = async (req, res) => {

    try {
        let users = await User.findAll({where: {}});

        let returnedUsers = [];


        if (!users.length) {
            res.status(400).send({message: "Users do not exist!"});
        } else {

            for (let i = 0; i < users.length; i++) {
                returnedUsers.push({id: users[i].id, name: users[i].name, email: users[i].email, phone: users[i].phone});
            }

            res.json(returnedUsers);
        }

    } catch (e) {
        res.status(400).send(e);
    }
}
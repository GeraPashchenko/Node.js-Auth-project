const Product = require('../../models/productModel');

module.exports.deleteProduct = async (req, res) => {
    let user = req.user;
    let id = req.params.id;
    let userDB = await User.findOne({where:{name: user.name}});


    let productDB = await Product.findAll({where: {id: id, userId: userDB.id}}).catch(err => {
        res.status(400).send(err);
    });

    if (!productDB.length) {
        res.status(400).send({message: "This product doesn't exists!"});

    } else {
        try {
            await Product.destroy({
                where: {
                    id: id,
                    userId: userDB.id
                }
            });

            res.json({message: "Deleted successfully!"});

        } catch (e) {
            res.status(422).send(e.errors);
        }
    }
}
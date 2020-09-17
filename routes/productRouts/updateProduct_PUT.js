const Product = require('../../models/productModel');
const User = require('../../models/userModel');

module.exports.updateProduct = async (req, res) => {
    let user = req.user;
    let id = req.params.id;
    let product = req.body;

    let userDB = await User.findOne({where: {name: user.name}}).catch(err => {
        res.status(400).send(err);
    });

    let productDB = await Product.findAll({where: {id: id, userId: userDB.id}}).catch(err => {
        res.status(400).send(err);
    });

    if (!productDB.length) {
        res.status(400).send({message: "This product doesn't exists!"});

    } else {
        try {
            await Product.update({
                title: product.title || productDB[0].title,
                price: product.price || productDB[0].price
            },{
                where: {
                    id: id,
                    userId: userDB.id
                }
            });

            let updatedProduct = await Product.findAll({where: {id: id}});

            res.json({
                id: updatedProduct[0].id,
                created_at: updatedProduct[0].created_at.getTime()/1000,
                title: updatedProduct[0].title,
                price: updatedProduct[0].price,
                image: updatedProduct[0].image,
                user: {id: userDB.id, name: userDB.name, email: userDB.email, phone: userDB.phone}
            });
        } catch (e) {
            res.status(422).send(e.errors);
        }
    }
}
const Product = require('../../models/productModel');
const User = require('../../models/userModel');

module.exports.createProduct = async (req, res) => {
    let user = req.user;
    let product = req.body;

    let userDB = await User.findOne({where: {name: user.name}}).catch(err => {
        res.status(400).send(err);
    });

    let productDB = await Product.findAll({
        where: {
            userId: userDB.id,
            title: product.title,
            price: product.price
        }
    }).catch(err => {
        res.status(400).send(err);
    });

    if (productDB.length) {
        res.status(400).send({message: "This product is already exists!"});

    } else {
        try {
            await Product.create({
                title: product.title,
                image: '',
                price: product.price,
                userId: userDB.id
            });

            let createdProduct = await Product.findAll({where: {title: product.title, price: product.price}});
            res.json({
                id: createdProduct[0].id,
                created_at: createdProduct[0].created_at.getTime()/1000,
                title: createdProduct[0].title,
                price: createdProduct[0].price,
                image: createdProduct[0].image,
                user: {id: userDB.id, name: userDB.name, email: userDB.email, phone: userDB.phone}
            });

        } catch (e) {
            res.status(422).send(e.errors);
        }
    }
}
const Product = require('../../models/productModel');
const Op = require('sequelize').Op;
const User = require('../../models/userModel');

module.exports.getProductByParams = async (req, res) => {
    let product = req.query;
    let returnedProducts = [];

    try {
        let productDB = await Product.findAll({
            where: {
                [Op.or]: [
                    {title: product.title || ''},
                    {userId: product.user_id || ''}
                ]
            },
            order: [
                [product.order_by || 'created_at', product.order_type ||'DESC'],
            ]
        });

        if (!productDB.length) {
            res.status(400).send({message: "Products doesn't exists!"});
        } else {


            for (let i = 0; i < productDB.length; i++) {

                let userDB = await User.findOne({where: {id: productDB[i].userId }}).catch(err => {
                    res.status(400).send(err);
                });

                returnedProducts.push({
                    id: productDB[i].id,
                    created_at: productDB[i].created_at.getTime()/1000,
                    title: productDB[i].title,
                    price: productDB[i].price,
                    image: productDB[i].image,
                    user: {id: userDB.id, name: userDB.name, email: userDB.email, phone: userDB.phone}
                })
            }

            res.json(returnedProducts);
        }

    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
}
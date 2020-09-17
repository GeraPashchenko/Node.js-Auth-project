const fs = require('fs');
const Product = require('../../models/productModel');
const User = require('../../models/userModel');

module.exports.getImageById = async (req, res) => {
    let user = req.user;
    let productId = req.params.id || req.query.id;

    let productDB = await Product.findOne({where: {id: productId}}).catch(e => {
        console.log(e)
    });

    let userDB = await User.findOne({where: {name: user.name, email: user.email}}).catch(e => {
        console.log(e)
    });

    if (productDB.image == '') {
        res.status(400).json({message:`Image field of the product is empty!`});
    } else if (productDB && userDB.id == productDB.userId) {
        let fileExists = fs.existsSync(`${process.env.FILE_STORAGE_DIR}/${productDB.image}`);

        if (fileExists) {
            res.sendFile(`${productDB.image}`, { root: process.env.FILE_STORAGE_DIR ,confine: false});

        } else if (!fileExists) {
            res.status(400).json({message:`Image doesn't exists in file system!`});
        }
    } else {
        res.status(400).json({message:`Image doesn't exists!`});
    }
}
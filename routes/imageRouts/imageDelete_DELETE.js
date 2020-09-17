const fs = require('fs');
const Product = require('../../models/productModel');
const User = require('../../models/userModel');

module.exports.deleteImage = async (req, res) => {
    let user = req.user;
    let id = req.params.id || req.query.id;

    let productDB = await Product.findOne({where: {id: id}}).catch(e => {
        console.log(e)
    });

    let userDB = await User.findOne({where: {name: user.name, email: user.email}}).catch(e => {
        console.log(e)
    });

    if (productDB && userDB.id == productDB.userId) {
        let fileExists = fs.existsSync(`${process.env.FILE_STORAGE_DIR}/${productDB.image}`);

        if (fileExists) {
            await Product.update({image: ''}, {where: {id: id}}).catch(e => {
                console.log(e);
            });

            fs.unlinkSync(`${process.env.FILE_STORAGE_DIR}/${productDB.image}`);
            res.json({message:'Image successfully deleted!'});

        } else {
            await Product.update({image: ''}, {where: {id: id}}).catch(e => {
                console.log(e);
            });

            res.json({message:'Image successfully deleted!'});
        }

    } else if (!productDB) {
        res.status(400).json({message:"There is no product with such id or you don't have permissions to do that!"});
    }

}
const multer = require('multer')
const {storage} = require('../../config/multerStorageConfig');
const Product = require('../../models/productModel');
const User = require('../../models/userModel');

module.exports.uploadImage = async (req, res) => {
    let user = req.user;
    let productId = req.params.id || req.query.id;

    const upload = multer({storage: storage}).single(process.env.IMAGE_UPLOAD_INPUT);

    let userDB = await User.findOne({where: {name: user.name, email: user.email}}).catch(e => {
        console.log(e)
    });
    let product = await Product.findOne({where: {id: productId}}).catch(e => {
        console.log(e)
    });


    if (product && userDB.id == product.userId) {
        upload(req, res, (err) => {

            let fileExt = req.file.originalname.split('.'); // get file extension from file name
            fileExt = fileExt[fileExt.length - 1];

            if (fileExt != 'jpg' && fileExt != 'png' && fileExt != 'svg' && fileExt != 'jpeg') {
                res.status(400).json({message: 'Only .jpg or .jpeg or .png or .svg file extensions are allowed'});
            } else {

                if (err) {
                    console.log(err)
                    return res.status(400).json({message: "Error uploading file."});
                }

                try {
                    Product.update({image: `${req.file.filename}`}, {
                        where: {
                            userId: userDB.id,
                            id: productId
                        }
                    }).then(v => {
                        console.log("Image uploaded");
                    }).catch(e => {
                        console.log(e);
                    })

                } catch (e) {
                    console.log(err);
                    res.status(400).json({message: "File upload error: " + e});
                }

                res.json({message: "File is uploaded"});
            }
        });
    } else {
        res.status(400).json({message: "There is no product with such id or you don't have permissions to do that!"});
    }

}
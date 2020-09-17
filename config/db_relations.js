const User = require('../models/userModel');
const Product = require('../models/productModel');

module.exports = async ()=>{
    // One user has many products
    User.hasMany(Product, {as: 'Products', foreignKey: "userId"});

    // One product has one creator
    Product.belongsTo(User, {as: "User", foreignKey: "userId"});

}
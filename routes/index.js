const express = require('express');
const router = express.Router();
const jwt_Auth = require('../middleware/JWT_Auth');


//rout handlers
const {userInfo} = require('./userRouts/userInfo_GET');
const {logout} = require('./authRouts/logout_GET');
const {signin} = require('./authRouts/signin_POST');
const {signup} = require('./authRouts/signup_POST');
const {userDataChange} = require('./userRouts/userDataChange_PUT');
const {userPasswordChange} = require('./userRouts/userPasswordChange_POST');
const {getAllUsers} = require('./userRouts/getAllUsers_GET');
const {getUserById} = require('./userRouts/getUserById_GET');
const {getUserByParams} = require('./userRouts/getUserByParams_GET');
const {createProduct} = require('./productRouts/createProduct_POST');
const {updateProduct} = require('./productRouts/updateProduct_PUT');
const {deleteProduct} = require('./productRouts/deleteProduct_POST');
const {getProductByParams} = require('./productRouts/getProductByParams_GET');
const {getImageById} = require('./imageRouts/getImage_GET');
const {uploadImage} = require('./imageRouts/imageUpload_POST');
const {deleteImage} = require('./imageRouts/imageDelete_DELETE');

// routs
router.post('/signin', signin);
router.post('/signup', signup);
router.get('/logout', jwt_Auth.authenticateToken, logout);
router.get('/info', jwt_Auth.authenticateToken, userInfo);
router.put('/userDataChange', jwt_Auth.authenticateToken, userDataChange);
router.post('/userPasswordChange', jwt_Auth.authenticateToken, userPasswordChange);
router.get('/getAllUsers', getAllUsers);
router.get('/getUserById/:id', getUserById);
router.get('/getUserByParams', getUserByParams);

router.post('/createProduct', jwt_Auth.authenticateToken, createProduct);
router.put('/updateProduct/:id', jwt_Auth.authenticateToken, updateProduct);
router.delete('/deleteProduct/:id', jwt_Auth.authenticateToken, deleteProduct);
router.get('/getProductByParams', getProductByParams);

router.get('/getProductImage/:id', jwt_Auth.authenticateToken, getImageById);
router.post('/uploadProductImage/:id', jwt_Auth.authenticateToken, uploadImage);
router.delete('/deleteProductImage/:id', jwt_Auth.authenticateToken, deleteImage)


module.exports = router;


//swagger docs
/**
 * @swagger
 * /userPasswordChange:
 *  put:
 *     description: change user password (needs token in headers)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiM..'
 *         in: header
 *         required: true
 *         type: string
 *
 *       - name: 'current_password'
 *         example: 'pass'
 *         in: body
 *         required: false
 *         type: string
 *
 *       - name: 'new_password'
 *         example: 'pass12'
 *         in: body
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: '{user obj}'
 *       400:
 *          description: '{message: `err object}'
 *       422:
 *          description: 'err obj'
 *
 * /userDataChange:
 *  put:
 *     description: updates user info with params(needs token in headers)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiM..'
 *         in: header
 *         required: true
 *         type: string
 *
 *       - name: name
 *         example: 'John'
 *         in: body
 *         required: false
 *         type: string
 *
 *       - name: email
 *         example: 'guru@gmail.com'
 *         in: body
 *         required: false
 *         type: string
 *
 *       - name: phone
 *         example: '+38095498721'
 *         in: body
 *         required: false
 *         type: string
 *
 *     responses:
 *       200:
 *         description: '{user obj}'
 *       400:
 *          description: '{message: `err object}'
 *       422:
 *          description: 'err obj'
 *
 *
 * /info:
 *   get:
 *     description: gets user info by token (needs token in headers)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiM..'
 *         in: header
 *         required: true
 *         type: string
 *
 *       - name: id
 *         example: '1'
 *         in: path
 *         required: true
 *         type: number
 *
 *     responses:
 *       200:
 *         description: '{user obj}'
 *       400:
 *          description: '{message: `err object}'
 *       422:
 *          description: 'err obj'
 *
 *
 * /getUserByParams:
 *   get:
 *     description: gets user by params
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         example: '1'
 *         in: path
 *         required: true
 *         type: string
 *
 *       - name: email
 *         example: '1'
 *         in: path
 *         required: true
 *         type: string
 *
 *     responses:
 *       200:
 *         description: '{user obj}'
 *       400:
 *          description: '{message: `err object}'
 *
 *
 * /getUserById/:id:
 *   get:
 *     description: gets user by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         example: '1'
 *         in: path
 *         required: true
 *         type: number
 *
 *     responses:
 *       200:
 *         description: '{user obj}'
 *       400:
 *          description: '{message: `err object}'
 *
 *
 * /getAllUsers:
 *   get:
 *     description: gets all users
 *     produces:
 *       - application/json
 *
 *     responses:
 *       200:
 *         description: '{users array}'
 *       400:
 *          description: '{message: `err object}'
 *
 *
 *
 * /updateProduct/:id:
 *   put:
 *     description: updates product (needs token in headers)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiM..'
 *         in: header
 *         required: true
 *         type: string
 *
 *       - name: title
 *         example: 'PC'
 *         in: body
 *         required: false
 *         type: string
 *
 *       - name: price
 *         example: '20$'
 *         in: body
 *         required: false
 *         type: string
 *
 *       - name: id
 *         example: '1'
 *         in: path
 *         required: true
 *         type: number
 *
 *     responses:
 *       200:
 *         description: '{message: `Deleted successfully!`}'
 *       400:
 *          description: '{message: `err object}'
 *       422:
 *          description: 'err obj'
 *
 *
 * /getProductByParams:
 *   get:
 *     description: get product with sorting by params (needs token in headers)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiM..'
 *         in: header
 *         required: true
 *         type: string
 *
 *       - name: 'title'
 *         example: 'Notebook'
 *         in: path
 *         required: false
 *         type: string
 *
 *       - name: 'user_id'
 *         example: '1'
 *         in: path
 *         required: false
 *         type: string
 *
 *       - name: order_by
 *         example: '[price|created_at]'
 *         default: 'created_at'
 *         in: path
 *         required: false
 *         type: string
 *
 *       - name: order_type
 *         example: '[asc|desc]'
 *         default: 'desc'
 *         in: path
 *         required: false
 *         type: string
 *
 *     responses:
 *       200:
 *         description: '{product obj}'
 *       400:
 *          description: '{message: `err object}'
 *       422:
 *          description: 'err obj'
 *
 *
 * /deleteProduct/:id:
 *   delete:
 *     description: deletes product (needs token in headers)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiM..'
 *         in: header
 *         required: true
 *         type: string
 *
 *       - name: id
 *         example: '1'
 *         in: path
 *         required: true
 *         type: number
 *
 *     responses:
 *       200:
 *         description: '{message: `Deleted successfully!`}'
 *       400:
 *          description: '{message: `err object}'
 *       422:
 *          description: 'err obj'
 *
 *
 * /createProduct:
 *   post:
 *     description: create product (needs token in headers)
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiM..'
 *         in: header
 *         required: true
 *         type: string
 *
 *       - name: title
 *         example: 'Dish washing machine'
 *         in: body
 *         required: true
 *         type: string
 *
 *       - name: price
 *         example: '234$'
 *         in: body
 *         required: true
 *         type: string
 *
 *     responses:
 *       200:
 *         description: '{created product obj}'
 *       400:
 *          description: '{message: `err object}'
 *       422:
 *          description: 'err obj'
 *
 *
 * /signin:
 *   post:
 *     description: sign in registered user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         example: 'John'
 *         in: body
 *         required: true
 *         type: string
 *
 *       - name: email
 *         example: 'guru@gmail.com'
 *         in: body
 *         required: true
 *         type: string
 *
 *       - name: phone
 *         example: '+38095498721'
 *         in: body
 *         required: true
 *         type: string
 *
 *       - name: password
 *         example: 'mypassword'
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: "{token: `user_auth_token`}"
 *       400:
 *         description: "{message: `User doesn't exists!`}"
 *
 *
 * /signup:
 *   post:
 *     description: register user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         example: 'John'
 *         in: body
 *         required: true
 *         type: string
 *
 *       - name: email
 *         example: 'guru@gmail.com'
 *         in: body
 *         required: true
 *         type: string
 *
 *       - name: phone
 *         example: '+38095498721'
 *         in: body
 *         required: true
 *         type: string
 *
 *       - name: password
 *         example: 'mypassword'
 *         in: body
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: '{token: `user_auth_token`}'
 *       400:
 *          description: '{message: `err object}'
 *       422:
 *          description: 'err obj'
 *
 * /logout:
 *  get:
 *      description: logout user (needs token in headers)
 *      produces:
 *       - application/json
 *      responses:
 *       200:
 *         description: '{message: `Logged out user with name < username >`}'
 *       400:
 *          description: '{err object}'
 *       403:
 *          description: '{message: `Token is blocked!` or `Token is invalid!`}'
 *
 * /getProductImage/:id:
 *  get:
 *      description: get image of the product with specified id (needs token in headers)
 *      produces:
 *       - application/json
 *      parameters:
 *       - name: token
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiM..'
 *         in: header
 *         required: true
 *         type: string
 *
 *       - name: id
 *         example: '1'
 *         in: path
 *         required: true
 *         type: number
 *      responses:
 *       200:
 *         description: 'returns file'
 *       400:
 *          description: '{message: `err object}'
 *       403:
 *          description: '{message: `Token is blocked!` or `Token is invalid!`}'
 *
 *
 * /deleteProductImage/:id:
 *  delete:
 *      description: delete image of the product with specified id (needs token in headers)
 *      produces:
 *       - application/json
 *      parameters:
 *       - name: token
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiM..'
 *         in: header
 *         required: true
 *         type: string
 *
 *       - name: id
 *         example: '1'
 *         in: path
 *         required: true
 *         type: number
 *      responses:
 *       200:
 *         description: '{message:`Image successfully deleted!`}'
 *       400:
 *          description: '{message: `err object}'
 *       403:
 *          description: '{message: `Token is blocked!` or `Token is invalid!`}'
 *
 *
 * /uploadProductImage/:id:
 *  post:
 *      description: uploads image of the product with specified id (needs token in headers)
 *      produces:
 *       - application/json
 *      parameters:
 *       - name: token
 *         example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiM..'
 *         in: header
 *         required: true
 *         type: string
 *
 *       - name: id
 *         example: '1'
 *         in: path
 *         required: true
 *         type: number
 *
 *       - name: 'product_image'
 *         example: 'PC.jpg'
 *         in: body
 *         required: true
 *         type: file
 *      responses:
 *       200:
 *         description: '{message:`Image successfully uploaded!`}'
 *       400:
 *          description: '{message: `err object}'
 *       403:
 *          description: '{message: `Token is blocked!` or `Token is invalid!`}'
 */


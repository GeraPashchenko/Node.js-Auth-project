const express = require('express');
const app = express();
const routs = require('./routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config(); // for reading env file
const swaggerOps = require('./swagger');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = swaggerJSDoc(swaggerOps);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


require('./sequelizeConnection'); // connect to db
require('./config/db_relations')(); // config relations of tables


app.use(bodyParser.json());// parse application/json
app.use(bodyParser.urlencoded({extended: false}));// parse application/x-www-form-urlencoded
app.use(cors());// cors middleware wor cross origin requests
app.use('/', routs);// routs


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // swagger documentation

app.listen(process.env.SERVER_PORT, (err) => {
    if (err) throw err;
    console.log(`========== STARTED ON PORT ${process.env.SERVER_PORT} ==========`);
});

app.get('/ssss', (req, res) => {
    res.json({ms: "sssss"});
});
const options = {
    swaggerDefinition: {
        info: {
            title: 'Product Announcements',
            version: '1.0.0',
            description: 'REST API with Swagger doc',
            contact: {
                email: 'garapashchenko@gmail.com',
            },
        },
        schemes: ['http'],
        host: `localhost:${process.env.SERVER_PORT}`,
        basePath: '/',
    },
    apis: ['./routes/index.js'],
};

module.exports = options;
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            version: '1.0.0',
        },
        servers: [{ url: '/api' }],
    },
    apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;

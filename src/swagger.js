const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

const options = {
    swaggerDefinition: {
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    in: 'header',
                    name: 'Authorization',
                    description: 'Bearer token to access these api endpoints',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            version: '1.0.0',
        },
        servers: [{ url: '/api' }],
    },
    apis: ['./route/*.js'],
};

const specs = swaggerJsdoc(options);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;

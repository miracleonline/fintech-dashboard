// swagger.js 
const swaggerJSDoc = require('swagger-jsdoc'); 
const swaggerUi = require('swagger-ui-express'); 
const options = { 
definition: { 
openapi: '3.0.0', 
info: { 
title: 'Fintech Dashboard API', 
version: '1.0.0', 
description: 'API documentation for user transactions, login, and dashboard', 
}, 
servers: [{ url: 'http://localhost:5000/api' }], 
components: { 
securitySchemes: { 
bearerAuth: { 
type: 'http', 
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
},
apis: ['./routes/*.js'], // <-- This tells swagger-jsdoc where to look for annotations 
}; 
const swaggerSpec = swaggerJSDoc(options); 
module.exports = { 
swaggerUi, 
swaggerSpec, 
};
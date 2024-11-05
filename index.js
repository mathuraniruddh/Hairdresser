require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const bodyParser = require('body-parser')
const connection = require('./middleware/database')
const redis = require('./middleware/redis');
const route = require('./routes/main')
require('../Hairdresser/middleware/passport-setup'); 

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // Specify the version
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API Documentation for My Application',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Your server URL
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs (JSDoc comments)
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('./middleware/upload', express.static('upload'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(connection)
app.use('/api',route);

app.listen(process.env.PORT)

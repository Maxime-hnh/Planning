require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const acl = require('express-acl');
const sequelize = require('./util/database');
const users = require('./routes/users');
const auth = require('./routes/auth');


//BODY-PARSER => CHANGE JSON AND URL FOMAT TO JS OBJECT
app.use(express.json({ limit: '10mb' })); //ANALYSE DATA SEND TO HTTP WITH JSON FORMAT 
app.use(express.urlencoded({ limit: '10mb', extended: false })); //ANALYSE DATA SEND TO HTTP WITH URL FORMAT

//CORS POLICY
app.use(cors({
    origin: "http://localhost:3001",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-access-token']
}));

//ACL CONFIG
acl.config({
    baseUrl: '/api',
    fileName: 'nacl.json',
    decodedObjectName: 'user',
    defaultRole: 'anonymous'
});

//TEST ROUTE
// app.get('/api', (req, res, next) => {
//     res.send('Hello World');
// });

// CRUD ROUTES
app.use('/api/login', auth)
app.use('/api/users', users)


//ERROR HANDLING
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});


//SYNC DATABASE
sequelize
    .sync()
    .then(result => {
        console.log("Database connected");
        app.listen(3000);
    })
    .catch(err => console.log('Une erreur est survenue', err));
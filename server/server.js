require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const acl = require('express-acl');
const sequelize = require('./util/database');
const auth = require('./routes/auth');
const users = require('./routes/users');
const customers = require('./routes/customers');
const contracts = require('./routes/contracts');
const initAssociations = require('./models/association');


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
app.use('/api/customers', customers)
app.use('/api/contracts', contracts)


//ERROR HANDLING
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

initAssociations();

//SYNC DATABASE
sequelize
    .sync()
    .then(result => {
        console.log("🚀🚀Database connected !🚀🚀");
        app.listen(3000);
    })
    .catch(err => console.log('⛔⛔Une erreur est survenue : ', err));
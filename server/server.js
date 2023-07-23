require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const acl = require('express-acl');


//BODY-PARSER => CHANGE JSON AND URL FOMAT TO JS OBJECT
app.use(express.json({ limit: '10mb' })); //ANALYSE DATA SEND TO HTTP WITH JSON FORMAT 
app.use(express.urlencoded({ limit: '10mb', extended: false })); //ANALYSE DATA SEND TO HTTP WITH URL FORMAT

//CORS POLICY
app.use(cors({
    origin : "http://localhost:3000",
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders : ['Content-Type', 'x-access-token']
}));

//ACL CONFIG
acl.config({
    baseUrl: '/api',
    fileName: 'nacl.json',
    decodedObjectName: 'user',
    defaultRole: 'anonymous'
  });
const customerController = require('../controllers/customerController');
const router = require('express').Router();
const auth = require('../middleware/auth');
const acl = require('express-acl');


router.post('/', customerController.addCustomer.bind(customerController))


module.exports = router;
const customerController = require('../controllers/customerController');
const router = require('express').Router();
const auth = require('../middleware/auth');
const acl = require('express-acl');


router.post('/', auth, acl.authorize, customerController.addCustomer.bind(customerController))
router.get('/all', auth, acl.authorize, customerController.allCustomers.bind(customerController))
router.get('/approved', auth, acl.authorize, customerController.getHaveApproved.bind(customerController))
router.get('/:customerId', auth, acl.authorize, customerController.getCustomerById.bind(customerController))
router.put('/:customerId', auth, acl.authorize, customerController.updateCustomer.bind(customerController))
router.delete('/:customerId', auth, acl.authorize, customerController.deleteCustomer.bind(customerController))


module.exports = router;
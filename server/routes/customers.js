const customerController = require('../controllers/customerController');
const router = require('express').Router();
const auth = require('../middleware/auth');
const acl = require('express-acl');


router.post('/', customerController.addCustomer.bind(customerController))
router.get('/all', customerController.allCustomers.bind(customerController))
router.get('/approved', customerController.getHaveApproved.bind(customerController))
router.get('/:customerId', customerController.getCustomerById.bind(customerController))
router.put('/:customerId', customerController.updateCustomer.bind(customerController))
router.delete('/:customerId', customerController.deleteCustomer.bind(customerController))


module.exports = router;
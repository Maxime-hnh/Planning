const userController = require('../controllers/userController');
const router = require('express').Router();
const auth = require('../middleware/auth');
const acl = require('express-acl');


router.post('/',auth, acl.authorize, userController.signUp.bind(userController))
router.get('/me', auth, acl.authorize, userController.getMe.bind(userController))


module.exports = router;
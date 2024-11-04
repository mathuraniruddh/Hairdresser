const express =  require('express')
var role = require('../routes/roleRoute')
var login = require('../routes/loginRoute')
var user = require('../routes/userRoute')
var shop = require('../routes/shopRoute')
var booking = require('../routes/bookingRoute')
var bookingCategory = require('../routes/bookingCategoryRoute')
var router = express.Router();

router.use('/role',role);
router.use('/login',login);
router.use('/user',user);
router.use('/shop',shop);
router.use('/booking',booking);
router.use('/bookingCategory',bookingCategory);

module.exports = router;

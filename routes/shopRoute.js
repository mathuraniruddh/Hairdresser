var express = require('express');
var router = express.Router();
const passport = require('passport');
var shopcontroller = require('../controllers/shopsController')
const upload = require('../middleware/upload')

router.post('/registerShop',upload.single('profilePicture'),passport.authenticate('jwt', { session: false }),shopcontroller.registerShop);
router.get('/getShops',passport.authenticate('jwt', { session: false }),shopcontroller.GetShop);
router.post('/updateShop',passport.authenticate('jwt', { session: false }),shopcontroller.UpdateShop);


module.exports = router
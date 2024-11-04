var express = require('express');
var router = express.Router();
const passport = require('passport');
var usercontroller = require('../controllers/usersController')
const upload = require('../middleware/upload')

router.post('/updateUser',upload.single('profilePicture'),passport.authenticate('jwt', { session: false }),usercontroller.UpdateUser);


module.exports = router;
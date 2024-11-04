var express = require('express');
var router = express.Router();
var logincontroller = require('../controllers/loginController')
const upload = require('../middleware/upload')

router.post('/registerUser',upload.single('profilePicture'),logincontroller.registerUser);

/**
 * @swagger
 * /api/login/loginUser:
 *   post:
 *     summary: Login into the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "mathuraniruddh"
 *               password:
 *                 type: string
 *                 example: "Aniruddh08!"           
 *     responses:
 *       200:
 *         description:  successfully logged in
 */
router.post('/loginUser',logincontroller.loginUser);
module.exports = router;
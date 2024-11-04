var express = require('express');
const passport = require('passport');
var router = express.Router();
const redis = require('../middleware/redis');
var rolecontroller = require('../controllers/rolesController')


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter your JWT token in the format "Bearer your_jwt_token"
 */

/**
 * @swagger
 * /api/role/addRoles:
 *   post:
 *     summary: Create a new role
 *     security:
 *       - BearerAuth: []  # Use the defined security scheme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *                 example: "Barber"
 *     responses:
 *       201:
 *         description: Role created successfully
 */
router.post('/addRoles',passport.authenticate('jwt', { session: false }),rolecontroller.AddRoles);

/**
 * @swagger
 * /api/role/deleteRole:
 *   post:
 *     summary: Delete a role
 *     security:
 *       - BearerAuth: []  # Use the defined security scheme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *                 example: "Barber"
 *               ID:
 *                 type: string
 *                 example: "670223056ef20b272bd9dc34"
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       400:
 *         description: Role does not exist or error occurred
 */

router.post('/deleteRole',passport.authenticate('jwt', { session: false }),rolecontroller.DeleteRole);

/**
 * @swagger
 * /api/role/updateRole:
 *   post:
 *     summary: update a role
 *     security:
 *       - BearerAuth: []  # Use the defined security scheme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *                 example: "Barber"
 *               ID:
 *                 type: string
 *                 example: "670223056ef20b272bd9dc34"
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Role does not exist or error occurred
 */
router.post('/updateRole',passport.authenticate('jwt', { session: false }),rolecontroller.UpdateRole);



/** 
 * @swagger
 * /api/role/getRole:
 *   get:
 *     summary: Get all roles
 *     security:
 *       - BearerAuth: []  # Use the defined security scheme
 *     responses:
 *       200:
 *         description: Successfully retrieved all roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     example: "Admin"
 *       400:
 *         description: Role does not exist or an error occurred
 */

router.get('/getRole',passport.authenticate('jwt', { session: false }),redis.redisCache,rolecontroller.GetRoles);
module.exports = router;   
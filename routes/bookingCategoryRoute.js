var express = require('express');
const passport = require('passport');
var router = express.Router();
var bookingCategorycontroller = require('../controllers/bookingCategoryController')


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
 * components:
 *   schemas:
 *     SubCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the subcategory.
 *         price:
 *           type: number
 *           description: price of the subcategory.
 *       required:
 *         - name
 */

/**
 * @swagger
 * /api/bookingCategory/addBookingCategory:
 *   post:
 *     summary: Create a new BookingCategory
 *     security:
 *       - BearerAuth: []  # Use the defined security scheme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingCategory:
 *                 type: string
 *                 example: "Haircut"
 *               gender:
 *                 type: string
 *                 example: "Men"
 *               subCategory:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/SubCategory'  # Correct indentation
 *     responses:
 *       201:
 *         description: BookingCategory created successfully
 */
router.post('/addBookingCategory',passport.authenticate('jwt', { session: false }),bookingCategorycontroller.AddBookingCategory);

/**
 * @swagger
 * /api/bookingCategory/deleteBookingCategory:
 *   post:
 *     summary: Delete a BookingCategory
 *     security:
 *       - BearerAuth: []  # Use the defined security scheme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingCategory:
 *                 type: string
 *                 example: "Haircut"
 *               ID:
 *                 type: string
 *                 example: "67090200e9327d61cf49b237"
 *     responses:
 *       200:
 *         description: BookingCategory deleted successfully
 *       400:
 *         description: BookingCategory does not exist or error occurred
 */

router.post('/deleteBookingCategory',passport.authenticate('jwt', { session: false }),bookingCategorycontroller.DeleteBookingCategory);

/**
 * @swagger
 * /api/bookingCategory/updateBookingCategory:
 *   post:
 *     summary: BookingCategory a role
 *     security:
 *       - BearerAuth: []  # Use the defined security scheme
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingCategory:
 *                 type: string
 *                 example: "Facial"
 *               ID:
 *                 type: string
 *                 example: "67090200e9327d61cf49b237"
 *     responses:
 *       200:
 *         description: BookingCategory updated successfully
 *       400:
 *         description: BookingCategory does not exist or error occurred
 */
router.post('/updateBookingCategory',passport.authenticate('jwt', { session: false }),bookingCategorycontroller.UpdateBookingCategory);

/**
*  @swagger
* /api/bookingCategory/addSubCategory:
*   post:
*     summary: Create a new Booking Category Subcategory
*     security:
*       - BearerAuth: []  # Use the defined security scheme
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               ID:
*                 type: string
*                 example: "670b663c285a0cafac5b29af"
*               subCategory:
*                 type: object
*                 properties:
*                   name:
*                     type: string
*                     description: The name of the subcategory.
*                   price:
*                     type: number
*                     description: The name of the subcategory.
*             required:
*               - subCategory
*     responses:
*       201:
*         description: Booking Category Subcategory created successfully
*       400:
*         description: Bad request, invalid input data
*       401:
*         description: Unauthorized, invalid token
*       500:
*         description: Internal server error
*/

router.post('/addSubCategory',passport.authenticate('jwt', { session: false }),bookingCategorycontroller.AddSubBookingCategory);

/**
*  @swagger
* /api/bookingCategory/updateSubCategory:
*   post:
*     summary: Updating Subcategory
*     security:
*       - BearerAuth: []  # Use the defined security scheme
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               ID:
*                 type: string
*                 example: "670b663c285a0cafac5b29af"
*               subCategory:
*                 type: string
*                 example: "substr"
*                 description: The name of the subcategory.
*               price:
*                 type: number
*                 example: 200
*             required:
*               - subCategory
*     responses:
*       201:
*         description: Booking Category Subcategory updating successfully
*       400:
*         description: Bad request, invalid input data
*       401:
*         description: Unauthorized, invalid token
*       500:
*         description: Internal server error
*/

router.post('/updateSubCategory',passport.authenticate('jwt', { session: false }),bookingCategorycontroller.UpdateSubBookingCategory);

/**
*  @swagger
* /api/bookingCategory/deleteSubCategory:
*   post:
*     summary: Deleting Subcategory
*     security:
*       - BearerAuth: []  # Use the defined security scheme
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               ID:
*                 type: string
*                 example: "670b663c285a0cafac5b29af"
*             required:
*               - ID
*     responses:
*       201:
*         description: Booking Category Subcategory deleting successfully
*       400:
*         description: Bad request, invalid input data
*       401:
*         description: Unauthorized, invalid token
*       500:
*         description: Internal server error
*/

router.post('/deleteSubCategory',passport.authenticate('jwt', { session: false }),bookingCategorycontroller.DeleteSubBookingCategory);


/**
*  @swagger
* /api/bookingCategory/getBookingCategory/{gender}:
*   get:
*     summary: Get all category and sub Category
*     security:
*       - BearerAuth: []  # Use the defined security scheme
*     parameters:
*       - in: path
*         name: gender
*         required: false
*         description: gender to fetch the Category.
*         schema:
*           type: string
*     responses:
*       201:
*         description: Booking Category Subcategory deleting successfully
*       400:
*         description: Bad request, invalid input data
*       401:
*         description: Unauthorized, invalid token
*       500:
*         description: Internal server error
*/

router.get('/getBookingCategory/:gender',passport.authenticate('jwt', { session: false }),bookingCategorycontroller.GetBookingCategory);



module.exports = router;
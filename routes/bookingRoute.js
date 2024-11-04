var express = require('express');
const passport = require('passport');
const redis = require('../middleware/redis')
var router = express.Router();
var bookingcontroller = require('../controllers/bookingController')

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
*  @swagger
* /api/booking/createBooking:
*   post:
*     summary: Create a new Booking .
*     security:
*       - BearerAuth: []  # Use the defined security scheme
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               customerID:
*                 type: string
*                 example: "670b663c285a0cafac5b29af"
*               customerName:
*                 type: string
*                 example: "abc"
*               barberID:
*                 type: string
*                 example: "670b663c285a0cafac5b29af"
*               barberName:
*                 type: string
*                 example: "abc"
*               shopID:
*                 type: string
*                 example: "1df88dbe-822e-4105-b681-6520f963d8b6"
*               shopName:
*                 type: string
*                 example: "abc"
*               bookingID:
*                 type: string
*                 example: "1df88dbe-822e-4105-b681-6520f963d8b6"
*               bookingCategory:
*                 type: string
*                 example: "abc"
*               subCategory:
*                 type: string
*                 example: "abc"
*               bookingDate:
*                 type: string
*                 example: "1996/07/08"
*               bookingStatus:
*                 type: string
*                 example: "In process"
*               price:
*                 type: number
*                 example: 200
*               paid:
*                 type: boolean
*                 example: true
*               paymmentType:
*                 type: string
*                 example: "UPI"
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

router.post('/createBooking',passport.authenticate('jwt', { session: false }),bookingcontroller.createBooking);

/**
*  @swagger
* /api/booking/getAvailableHairdresser:
*   post:
*     summary: get Available Hairdresser .
*     security:
*       - BearerAuth: []  # Use the defined security scheme
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               shopID:
*                 type: string
*                 example: "1df88dbe-822e-4105-b681-6520f963d8b6"
*               bookingDate:
*                 type: string
*                 example: "1996/07/08"
*               bookingStartTime:
*                 type: string
*                 example: "12:00pm"
*             required:
*               - shopID
*     responses:
*       201:
*         description: get Available Hairdresser successfully
*       400:
*         description: Bad request, invalid input data
*       401:
*         description: Unauthorized, invalid token
*       500:
*         description: Internal server error
*/

router.post('/getAvailableHairdresser',passport.authenticate('jwt', { session: false }),bookingcontroller.getAvailableHairdresser);

/**
*  @swagger
* /api/booking/getBookingsOfHairdresser:
*   post:
*     summary: Get all bookings of a barber for a date
*     security:
*       - BearerAuth: []  # Use the defined security scheme
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               barberID:
*                 type: string
*                 example: "6704ef182e6b032f659fc7f0"
*               bookingDate:
*                 type: string
*                 example: "2024/10/19"
*             required:
*               - barberID
*     responses:
*       201:
*         description: These are your bookings for today
*       400:
*         description: Bad request, invalid input data
*       401:
*         description: Unauthorized, invalid token
*       500:
*         description: Internal server error
*/

router.post('/getBookingsOfHairdresser',passport.authenticate('jwt', { session: false }),bookingcontroller.getBookingsOfHairdresser)

/**
*  @swagger
* /api/booking/getBookingsOfCustomer:
*   post:
*     summary: Get all bookings of a customer
*     security:
*       - BearerAuth: []  # Use the defined security scheme
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               customerID:
*                 type: string
*                 example: "6704ef182e6b032f659fc7f0"
*             required:
*               - customerID
*     responses:
*       201:
*         description: These are all your bookings
*       400:
*         description: Bad request, invalid input data
*       401:
*         description: Unauthorized, invalid token
*       500:
*         description: Internal server error
*/

router.post('/getBookingsOfCustomer',passport.authenticate('jwt', { session: false }),redis.redisCache,bookingcontroller.getBookingsOfCustomer)


/**
*  @swagger
* /api/booking/bookingCompleted:
*   post:
*     summary: Booking has been completed
*     security:
*       - BearerAuth: []  # Use the defined security scheme
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               bookingID:
*                 type: string
*                 example: "6704ef182e6b032f659fc7f0"
*             required:
*               - bookingID
*     responses:
*       201:
*         description: These are all your bookings
*       400:
*         description: Bad request, invalid input data
*       401:
*         description: Unauthorized, invalid token
*       500:
*         description: Internal server error
*/

router.post('/bookingCompleted',passport.authenticate('jwt', { session: false }),bookingcontroller.bookingCompleted)

/**
*  @swagger
* /api/booking/getUpcomingBookings:
*   post:
*     summary: For upcoming bookings
*     security:
*       - BearerAuth: []  # Use the defined security scheme
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               barberID:
*                 type: string
*                 example: "6704ef182e6b032f659fc7f0"
*             required:
*               - barberID
*     responses:
*       201:
*         description: These are all your bookings
*       400:
*         description: Bad request, invalid input data
*       401:
*         description: Unauthorized, invalid token
*       500:
*         description: Internal server error
*/

router.post('/getUpcomingBookings',passport.authenticate('jwt', { session: false }),bookingcontroller.getUpcomingBookings)

module.exports = router; 
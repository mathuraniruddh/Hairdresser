const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;
const ObjectID = Schema.Types.ObjectId

const bookingSchema = new mongoose.Schema({
    customerID: {
        type: ObjectID,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    barberName:{
        type: String,
        required: true,
    },
    barberID:{
        type: ObjectID,
        required: true,
    },
    shopID:{
        type: String,
        required: true
    },
    shopName:{
        type: String,
        required: true
    },
    bookingID:{
        type: String,
        required: true,
        unique: true,
        default: uuidv4,
    },
    bookingCategory:{
        type: String,
        required: true,
    },
    subCategory:{
        type: String,
        required: true,
    },
    bookingDate:{
        type: Date,
        required: true,
    },
    bookingStartTime:{
        type: String,
        required: false
    },
    bookingEndTime:{
        type: String,
        required: false 
    },
    timeOfDay:{
        type: String,
        required: false 
    },
    bookingStatus:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    paid:{
        type: Boolean,
        required: true
    },
    paymmentType:{
        type: String,
        required: true  
    }
});
 
const Bookings = mongoose.model('Bookings', bookingSchema );

module.exports = Bookings;
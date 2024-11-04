const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({  // Unique identifier for subcategory
    name: { type: String, required: true } , // Name of the subcategory
    price: { type: Number, required: true }
  });

const bookingCategorySchema = new mongoose.Schema({  
    bookingCategory:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    subCategory:[subcategorySchema]
});
 
const BookingCategory= mongoose.model('BookingCategory', bookingCategorySchema );

module.exports = BookingCategory;
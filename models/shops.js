const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const shopSchema = new mongoose.Schema({
    profile: {
        type: String,
        validate: {
            validator: function(value) {
                // Roles that do not require a bio
                const rolesThatDontNeedBio = ['Customer','Barber'];
                
                // If the role is in the exempt list, bio is optional
                return rolesThatDontNeedBio.includes(this.role) || (value && value.length > 0);
            },
            message: props => `${props.value} is not a valid profile for the ${props.instance.role} role!`,
        },
    },
    shopName: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    pincode:{
        type: String,
        required: true,
    },
    ShopID:{
        type: String,
        required: true,
        unique: true,
        default: uuidv4,
    },
    mobileNo:{
        type: Number,
        required: true
    },
    noSeats:{
        type: Number,
        required: true
    },
    noWorkers:{
        type: Number,
        required: true
    }

});

const Shops= mongoose.model('Shops', shopSchema );

module.exports = Shops;
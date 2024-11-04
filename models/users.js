const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    profile: {
        type: String,
        validate: {
            validator: function(value) {
                // Roles that do not require a bio
                const rolesThatDontNeedBio = ['Admin','SuperAdmin'];
                
                // If the role is in the exempt list, bio is optional
                return rolesThatDontNeedBio.includes(this.role) || (value && value.length > 0);
            },
            message: props => `${props.value} is not a valid profile for the ${props.instance.role} role!`,
        },
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    ShopID:{type: String,
        validate: {
            validator: function(value) {
                // Roles that do not require a bio
                const rolesThatDontNeedBio = ['Admin', 'SuperAdmin','Customer'];
                
                // If the role is in the exempt list, bio is optional
                return rolesThatDontNeedBio.includes(this.role) || (value && value.length > 0);
            },
            message: props => `${props.value} is not a valid profile for the ${props.instance.role} role!`,
        },
    },
    dateOfBirth :  {
        type: Date,
        required: true
    },
    password :{
        type: String,
        required: true
    },
    mobileNo:{
        type: Number,
        required: true
    }
});

const Users= mongoose.model('Users', userSchema);

module.exports = Users;
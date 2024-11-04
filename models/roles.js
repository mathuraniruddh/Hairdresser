// models/User.js
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: String
});

const Roles= mongoose.model('Roles', roleSchema);

module.exports = Roles;

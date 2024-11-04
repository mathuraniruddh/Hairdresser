// middleware/mongoConnection.js
const mongoose = require('mongoose');

// Change 'mydatabase' to your database name

const connectToMongoDB = async (req, res, next) => {
    if (mongoose.connection.readyState === 0) { // Check if already connected
        try {
            await mongoose.connect(process.env.MONGOURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('MongoDB connection error:', error);
            return res.status(500).send('Database connection failed');
        }
    }
    next(); // Call next middleware
};

module.exports = connectToMongoDB;

const mongoose = require('mongoose');

function connectDB() {
    const dbURI = process.env.MONGODB_URI;
    mongoose.connect(dbURI)
        .then(() => {
            console.log('Connected to MongoDB');
        }).catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
    
}

module.exports = connectDB;
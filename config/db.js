const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Load .env from the root directory
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const connectDB = async () => {
    try {
        // Check if MONGO_URI exists
        if (!process.env.MONGO_URI) {
            console.error('MONGO_URI is not defined in .env file');
            console.log('Current directory:', __dirname);
            console.log('Looking for .env file in:', path.join(__dirname, '..'));
            console.log('Environment variables:', Object.keys(process.env).filter(key => key.includes('MONGO')));
            throw new Error('MONGO_URI is not defined');
        }
        
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
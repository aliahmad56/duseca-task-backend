const mongoose = require('mongoose'); 

mongoose.Promise = global.Promise;
require('dotenv').config()

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGDB_URL, {
            dbName: process.env.DB_NAME,
            // user: process.env.USER,
            // pass: process.env.PASS,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

connectDB();

module.exports = mongoose.connection;

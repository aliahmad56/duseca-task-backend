require('dotenv').config();

const express = require('express');
const createError = require('http-errors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const expressSanitizer = require('express-sanitizer');
const db = require('./config/db.config.js');
const CustomError = require('./src/errors/customError.js')
const routes = require('./src/routes/index');
// const CustomError = require('./error/CustomError.js');

// init db
// require('./config/dbConfig.js');

const app = express();
app.use(express.json());

// Security middleware
app.use(helmet()); // Secure HTTP headers

// Rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});
// app.use('/backend', apiLimiter); // Apply to all API routes

// Remove 'X-Powered-By' header
app.disable('x-powered-by');

app.use(cors());
app.use(expressSanitizer());

// all routes
app.use('/backend', routes);

// global error handling middlewares
app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ status: false, message: err.message });
  }
  res.status(500).json({ status: false, message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// not found custom error class
class NotFoundError extends CustomError {
  constructor(message) {
    super(message || 'Not Found', 404);
  }
}

module.exports = CustomError;

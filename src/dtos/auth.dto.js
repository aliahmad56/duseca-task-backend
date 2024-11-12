const Joi = require('joi');

const signupDto = Joi.object({
  name: Joi.string().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be an empty string'
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be an empty string',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required'
  }),

  role: Joi.string().messages({
    'string.base': 'Role must be a string',
    'string.empty': 'Role cannot be an empty string'
  }),

  password: Joi.string().min(3).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be an empty string',
    'string.min': 'Password must have at least {#limit} characters',
    'any.required': 'Password is required'
  })
});

const LoginUserDto = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email cannot be an empty string',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required'
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be an empty string',
    'any.required': 'Password is required'
  })
});

module.exports = {
  signupDto,
  LoginUserDto
};

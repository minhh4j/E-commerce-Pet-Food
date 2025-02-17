const Joi = require("joi");

// register validation

const registerValidation = Joi.object({
  username: Joi.string()
    .min(3)
    .max(15)
    .trim() 
    .required()
    .messages({
      "string.min": "🚨 Username must be at least 3 characters long. Try making it more unique!",
      "string.max": "⚠️ Username cannot exceed 15 characters. Keep it short and memorable!",
      "string.empty": "❌ Username is required.",
      "string.trim": "⚠️ Username cannot have leading or trailing spaces.",
    }),
  
  email: Joi.string()
    .email()
    .required()
    .messages({
      "string.email": "📧 Please enter a valid email address.",
      "string.empty": "❌ Email is required.",
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "🔒 Password must be at least 6 characters long.",
      "string.empty": "❌ Password is required.",
    }),

  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "🔁 Confirm Password must match Password.",
      "string.empty": "❌ Confirm Password is required.",
    }),
});

// login validation 

const loginValidation = Joi.object({
  email:Joi.string()
  .email()
  .required()
  .messages({
    'string.email': 'Please enter a valid email address.',
    'string.empty': 'Email is required.',
  }),
  password:Joi.string()
  .required()
  .messages({
    'string.empty': 'Password is required.',
  }),

})

module.exports = {registerValidation , loginValidation } ;
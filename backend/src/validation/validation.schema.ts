import * as Joi from "joi";

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const createBikeSchema = Joi.object({
  model: Joi.string().required().messages({
    "string.empty": "Model is required",
  }),
  color: Joi.string().required().messages({
    "string.empty": "Color is required",
  }),
  location: Joi.string().required().messages({
    "string.empty": "Location is required",
  }),
  avgRating: Joi.number().min(0).max(5).optional().messages({
    "number.base": "Average rating must be a number",
    "number.min": "Rating cannot be below 0",
    "number.max": "Rating cannot exceed 5",
  }),
});

export const updateUserSchema = Joi.object({
  email: Joi.string().email().optional(),
  role: Joi.string().valid("user", "manager").optional(),
});

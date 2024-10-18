import Joi from "joi";

export const bikeSchema = Joi.object({
  model: Joi.string().min(1).required().messages({
    "string.empty": `"Model" cannot be empty`,
  }),
  color: Joi.string().min(1).required().messages({
    "string.empty": `"Color" cannot be empty`,
  }),
  location: Joi.string().min(1).required().messages({
    "string.empty": `"Location" cannot be empty`,
  }),
  avgRating: Joi.number().min(0).max(5).required().messages({
    "number.base": `"Avg Rating" must be a number`,
    "number.min": `"Avg Rating" must be at least 0`,
    "number.max": `"Avg Rating" must be less than or equal to 5`,
  }),
});

import Joi from "joi";

const checkoutSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message("Invalid email"),
  name: Joi.string(),
  surname: Joi.string(),
  company: Joi.string(),
  city: Joi.string(),
  zipcode: Joi.string()
    .pattern(/^(\d+){6,8}$/)
    .message("Invalid Zip Code"),
  phoneNumber: Joi.string()
    .pattern(/^(\d+){10,10}$/)
    .message("Invalid phone number"),
});

export default checkoutSchema;

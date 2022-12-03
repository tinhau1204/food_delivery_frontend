import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message("Invalid email"),
  firstName: Joi.string(),
  lastName: Joi.string(),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/))
    .message(
      "Password must contain at least 1 lower, 1 upper, 1 numeric character with 8 length long",
    ),
  role: Joi.string(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} did not match" }),
  phoneNumber: Joi.string()
    .pattern(/^(\d+){10,10}$/)
    .message("Invalid phone number"),
});

export default registerSchema;

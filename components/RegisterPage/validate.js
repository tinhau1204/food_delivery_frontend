import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message("Invalid email"),
  name: Joi.string(),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/))
    .message(
      "Password must contain at least 1 lower, 1 upper, 1 numeric character with 8 length long",
    ),
  role_id: Joi.string(),
  // confirmPassword: Joi.string()
  //   .valid(Joi.ref("password"))
  //   .label("Confirm password")
  //   .messages({ "any.only": "{{#label}} did not match" }),
  timestamp: Joi.string(),
});

export default registerSchema;

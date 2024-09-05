import Joi from "joi";

const userValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    role: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .required()
});

export default userValidation;

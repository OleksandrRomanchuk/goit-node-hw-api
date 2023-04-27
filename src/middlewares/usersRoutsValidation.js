const Joi = require("joi");
const { HTTPError } = require("../helpers");

const authValidation = (req, _, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    const errorMessage = result.error.details[0].message;

    throw HTTPError(400, errorMessage);
  }

  next();
};

const subscriptionValidation = (req, _, next) => {
  const schema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  }).options({ allowUnknown: true });

  const result = schema.validate(req.body);

  if (result.error) {
    const errorMessage = result.error.details[0].message;

    throw HTTPError(400, errorMessage);
  }

  next();
};

const emailValidation = (req, _, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  }).options({ allowUnknown: true });

  const result = schema.validate(req.body);

  if (result.error) {
    throw HTTPError(400, "Missing required field email");
  }

  next();
};

module.exports = { authValidation, subscriptionValidation, emailValidation };

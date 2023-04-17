const Joi = require("joi");
const { HTTPError } = require("../helpers");

const addContactValidation = (req, _, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).trim().required(),
    email: Joi.string().min(3).trim().email().required(),
    phone: Joi.string().min(6).trim().required(),
    favorite: Joi.boolean(),
  }).options({ allowUnknown: true });

  const result = schema.validate(req.body);

  if (result.error) {
    const errorFieldName = result.error.details[0].context.key;

    throw HTTPError(400, `Missing required '${errorFieldName}' field.`);
  }

  next();
};

const updateContactValidation = (req, _, next) => {
  if (!Object.keys(req.body).length) throw HTTPError(400, "Missing fields");

  const schema = Joi.object({
    name: Joi.string().min(3).trim(),
    email: Joi.string().min(3).trim().email(),
    phone: Joi.string().min(6).trim(),
    favorite: Joi.boolean(),
  });

  const result = schema.validate(req.body);

  if (result.error) throw HTTPError(400, result.error.details[0].message);

  next();
};

const updateStatusValidation = (req, _, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  }).options({ allowUnknown: true });

  const result = schema.validate(req.body);

  if (result.error) throw HTTPError(400, "Missing field favorite");

  next();
};

module.exports = {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
};

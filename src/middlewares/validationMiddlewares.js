const Joi = require("joi");

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).trim().required(),
    email: Joi.string().min(3).max(30).trim().email().required(),
    phone: Joi.string().min(6).max(30).trim().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    const errorFieldName = result.error.details[0].context.key;

    return res
      .status(400)
      .json({ message: `missing required '${errorFieldName}' field` });
  }

  next();
};

const updateContactValidation = (req, res, next) => {
  if (!Object.keys(req.body).length)
    return res.status(400).json({ message: "missing fields" });

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).trim(),
    email: Joi.string().min(3).max(30).trim().email(),
    phone: Joi.string().min(6).max(30).trim(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).json({ message: result.error.details[0].message });
  }

  next();
};

module.exports = { addContactValidation, updateContactValidation };

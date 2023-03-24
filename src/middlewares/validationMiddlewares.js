const Joi = require("joi");

const contactValidation = (req, res, next) => {
  console.log(req.url);
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).trim().required(),
    email: Joi.string().min(3).max(30).trim().email().required(),
    phone: Joi.string().min(6).max(30).trim().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    const errorMessage = result.error.details[0].message;
    const infoMessage =
      req.url === "/" ? "missing required name field" : "missing fields";
    return res
      .status(400)
      .json({ message: infoMessage, details: errorMessage });
  }

  next();
};

module.exports = { contactValidation };

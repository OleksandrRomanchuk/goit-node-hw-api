const Joi = require("joi");

const contactValidation = (req, res, next) => {
  console.log(req.url);
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string()
      .trim()
      .email({
        minDomainSegments: 2,
      })
      .required(),
    phone: Joi.string().trim().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    const infoMessage =
      req.url === "/" ? "missing required name field" : "missing fields";
    return res.status(400).json({ message: infoMessage });
  }

  next();
};

module.exports = { contactValidation };

const mongoose = require("mongoose");
const { HTTPError } = require("../helpers");

const isValidId = (req, _, next) => {
  const id = req.params.contactId;

  if (!id || !mongoose.isValidObjectId(id)) throw HTTPError(404, "Not found");

  next();
};

module.exports = isValidId;

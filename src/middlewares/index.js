const isValidId = require("./isValidId");
const authorizationCheck = require("./authorizationCheck");
const {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
} = require("./contactsRoutsValidations");
const {
  authValidation,
  subscriptionValidation,
  emailValidation,
} = require("./usersRoutsValidation");
const upload = require("./upload");

module.exports = {
  isValidId,
  authorizationCheck,
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
  authValidation,
  subscriptionValidation,
  emailValidation,
  upload,
};

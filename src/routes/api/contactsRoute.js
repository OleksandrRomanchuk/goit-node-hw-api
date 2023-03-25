const express = require("express");
const contactsRouter = express.Router();
const contactsControllers = require("../../controllers/contactsController");
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validationMiddlewares.js");

contactsRouter
  .get("/", contactsControllers.getAll)
  .get("/:contactId", contactsControllers.getById)
  .post("/", addContactValidation, contactsControllers.add)
  .put("/:contactId", updateContactValidation, contactsControllers.update)
  .delete("/:contactId", contactsControllers.remove);

module.exports = contactsRouter;

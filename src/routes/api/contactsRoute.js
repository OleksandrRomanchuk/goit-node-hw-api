const express = require("express");
const contactsRouter = express.Router();
const contactsControllers = require("../../controllers/contactsController");
const {
  contactValidation,
} = require("../../middlewares/validationMiddlewares.js");

contactsRouter
  .get("/", contactsControllers.getAll)
  .get("/:contactId", contactsControllers.getById)
  .post("/", contactValidation, contactsControllers.add)
  .put("/:contactId", contactValidation, contactsControllers.update)
  .delete("/:contactId", contactsControllers.remove);

module.exports = contactsRouter;

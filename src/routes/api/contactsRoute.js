const express = require("express");
const contactsRouter = express.Router();
const { asyncControlersWrapper } = require("../../helpers");
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validationMiddlewares.js");
const {
  getAll,
  getById,
  add,
  update,
  remove,
} = require("../../controllers/contactsController");

contactsRouter
  .get("/", asyncControlersWrapper(getAll))
  .get("/:contactId", asyncControlersWrapper(getById))
  .post("/", addContactValidation, asyncControlersWrapper(add))
  .put("/:contactId", updateContactValidation, asyncControlersWrapper(update))
  .delete("/:contactId", asyncControlersWrapper(remove));

module.exports = contactsRouter;

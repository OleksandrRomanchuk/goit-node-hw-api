const { Router } = require("express");
const { isValidId } = require("../../middlewares");
const {
  addContactValidation,
  updateContactValidation,
  updateStatusValidation,
} = require("../../middlewares");
const {
  getAll,
  getById,
  add,
  update,
  remove,
  updateStatus,
} = require("../../controllers/contactsControllers");
const { authorizationCheck } = require("../../middlewares");

const contactsRouter = Router();

contactsRouter
  .get("/", authorizationCheck, getAll)
  .get("/:contactId", authorizationCheck, isValidId, getById)
  .post("/", authorizationCheck, addContactValidation, add)
  .delete("/:contactId", authorizationCheck, isValidId, remove)
  .put(
    "/:contactId",
    authorizationCheck,
    isValidId,
    updateContactValidation,
    update
  )
  .patch(
    "/:contactId/favorite",
    authorizationCheck,
    isValidId,
    updateStatusValidation,
    updateStatus
  );

module.exports = contactsRouter;

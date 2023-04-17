const { Router } = require("express");
const { authValidation, subscriptionValidation } = require("../../middlewares");
const {
  signUp,
  signIn,
  logOut,
  getCurrentUser,
  updateSubscription,
} = require("../../controllers/authControllers");
const { authorizationCheck } = require("../../middlewares");

const usersRouter = Router();

usersRouter
  .post("/register", authValidation, signUp)
  .post("/login", authValidation, signIn)
  .post("/logout", authorizationCheck, logOut)
  .get("/current", authorizationCheck, getCurrentUser)
  .patch("/", authorizationCheck, subscriptionValidation, updateSubscription);

module.exports = usersRouter;

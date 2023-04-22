const { Router } = require("express");
const {
  authValidation,
  subscriptionValidation,
  emailValidation,
  upload,
} = require("../../middlewares");
const {
  signUp,
  signIn,
  logOut,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendingVerifyLetter,
} = require("../../controllers/authControllers");
const { authorizationCheck } = require("../../middlewares");

const usersRouter = Router();

usersRouter
  .post("/register", authValidation, signUp)
  .post("/login", authValidation, signIn)
  .post("/logout", authorizationCheck, logOut)
  .get("/current", authorizationCheck, getCurrentUser)
  .patch("/", authorizationCheck, subscriptionValidation, updateSubscription)
  .patch("/avatars", authorizationCheck, upload.single("avatar"), updateAvatar)
  .get("/verify/:verificationToken", verifyEmail)
  .post("/verify", emailValidation, resendingVerifyLetter);

module.exports = usersRouter;

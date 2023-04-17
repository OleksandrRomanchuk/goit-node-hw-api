const User = require("./userSchemas");

const checkingDoesEmailInUse = (email) => User.findOne({ email });

const registerUser = (credentials) => User.create(credentials);

const logInUser = (credentials) => User.findOne(credentials);

const setToken = (_id, { token }) => User.findByIdAndUpdate(_id, { token });

const changeSubscription = (_id, { subscription }) =>
  User.findByIdAndUpdate(
    { _id },
    { subscription },
    { returnDocument: "after" }
  );

const setNewAvatar = (_id, avatarURL) =>
  User.findByIdAndUpdate(_id, { avatarURL });

module.exports = {
  checkingDoesEmailInUse,
  registerUser,
  logInUser,
  setToken,
  changeSubscription,
  setNewAvatar,
};

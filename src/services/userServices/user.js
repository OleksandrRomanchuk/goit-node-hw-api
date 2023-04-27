const User = require("./userSchemas");

const checkUserByAnyField = (field) => User.findOne(field);

const registerUser = (credentials) => User.create(credentials);

const logInUser = (credentials) => User.findOne({ email: credentials });

const setToken = (_id, { token }) => User.findByIdAndUpdate(_id, { token });

const changeSubscription = (_id, { subscription }) =>
  User.findByIdAndUpdate(
    { _id },
    { subscription },
    { returnDocument: "after" }
  );

const setNewAvatar = (_id, avatarURL) =>
  User.findByIdAndUpdate(_id, { avatarURL });

const verifyUserEmail = (field, fieldsToUpdate) =>
  User.findOneAndUpdate({ ...field }, fieldsToUpdate, {
    returnDocument: "after",
  });
module.exports = {
  checkUserByAnyField,
  registerUser,
  logInUser,
  setToken,
  changeSubscription,
  setNewAvatar,
  verifyUserEmail,
};

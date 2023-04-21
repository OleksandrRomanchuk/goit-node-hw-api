const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const {
  checkingDoesEmailInUse,
  registerUser,
  logInUser,
  setToken,
  changeSubscription,
  setNewAvatar,
} = require("../services/userServices/user");
const { HTTPError, asyncControlersWrapper } = require("../helpers");
const { SECRET_KEY } = process.env;

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const user = await checkingDoesEmailInUse(email);

  if (user) throw HTTPError(409, "Email in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const result = await registerUser({
    email,
    password: hashedPassword,
    avatarURL,
  });

  return res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
    },
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const result = await logInUser({ email });

  if (!result) throw HTTPError(401, "Email or password is wrong");

  const isValidPassword = await bcrypt.compare(password, result.password);

  if (!isValidPassword) throw HTTPError(401, "Email or password is wrong");

  const userId = result._id;

  const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "5h" });

  await setToken(userId, { token });

  res.status(200).json({
    token,
    user: { email: result.email, subscription: result.subscription },
  });
};

const logOut = async (req, res, _) => {
  const { _id } = req.user;

  await setToken(_id, { token: "" });

  res.status(204).json({ message: "Logout sucess" });
};

const getCurrentUser = async (req, res, _) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const updateSubscription = async (req, res, _) => {
  const { _id } = req.user;

  const result = await changeSubscription(_id, req.body);

  res
    .status(200)
    .json({ email: result.email, subscription: result.subscription });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  const image = await jimp.read(tmpUpload);

  image.resize(250, 250);
  await image.writeAsync(tmpUpload);

  const newFileName = `${_id}_${originalname}`;
  const resultUpload = path.join(
    __dirname,
    "../../",
    "public",
    "avatars",
    newFileName
  );

  await fs.rename(tmpUpload, resultUpload);

  const avatarURL = path.join("avatars", newFileName);

  await setNewAvatar(_id, avatarURL);

  res.status(200).json({ avatarURL });
};

module.exports = {
  signUp: asyncControlersWrapper(signUp),
  signIn: asyncControlersWrapper(signIn),
  logOut: asyncControlersWrapper(logOut),
  getCurrentUser: asyncControlersWrapper(getCurrentUser),
  updateSubscription: asyncControlersWrapper(updateSubscription),
  updateAvatar: asyncControlersWrapper(updateAvatar),
};

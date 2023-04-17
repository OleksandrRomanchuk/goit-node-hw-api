const jwt = require("jsonwebtoken");
const User = require("../services/userServices/userSchemas");
const { HTTPError } = require("../helpers");
const { SECRET_KEY } = process.env;

const authorizationCheck = async (req, _, next) => {
  try {
    const { authorization = "" } = req.headers;

    if (!authorization) throw HTTPError(401, "Not authorized");

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") throw HTTPError(401, "Not authorized");

    const { userId } = jwt.verify(token, SECRET_KEY);

    if (!userId) throw HTTPError(401, "Not authorized");

    const user = await User.findById(
      { _id: userId },
      "email subscription token"
    );

    if (!user || !user.token || user.token !== token)
      throw HTTPError(401, "Not authorized");

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizationCheck;

const { connect } = require("mongoose");

const uri = process.env.MONGODB_URL;

const connectDB = async () => {
  return await connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;

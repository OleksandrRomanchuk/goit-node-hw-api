const app = require("./app");
const { connectDB } = require("./src/db/connection");

const port = process.env.PORT || 8081;

const serverStart = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log("Database connection successful.");
    });
  } catch (error) {
    console.log(error.message);
  }
};

serverStart();

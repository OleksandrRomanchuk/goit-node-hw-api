const app = require("./app");
const connectDB = require("./db/connection");

const port = process.env.PORT || 8081;

process.on("exit", (code) => {
  console.log(`Exit with code: ${code}`);
});

const serverStart = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log("Database connection successful.");
    });
  } catch (error) {
    process.exitCode = 1;
    console.log(error.message);
  }
};

serverStart();

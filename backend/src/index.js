import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config({ path: "./.env" });

const startServer = async () => {
  try {
    await connectDB();
    app.on("error", (error) => {
      console.log("Error in starting server", error);
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log("App running in port", process.env.PORT);
    });
  } catch (error) {
    console.log("Problem to start server", error);
  }
};
startServer();

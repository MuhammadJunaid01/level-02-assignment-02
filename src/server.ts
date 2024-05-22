import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
const main = async () => {
  try {
    const dbUri = config.database_url;
    if (!dbUri) {
      throw new Error("Database URL is not defined.");
    }

    await mongoose.connect(dbUri);

    console.log("MongoDB connected successfully");

    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error("Error during MongoDB connection setup:", error);

    process.exit(1);
  }
};

main();

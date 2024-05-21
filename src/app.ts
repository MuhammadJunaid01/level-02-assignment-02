import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { ZodError } from "zod";

import mongoose from "mongoose";
import { productRouter } from "./app/product/product.route";
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", productRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Server running on http://localhost:5000");
});
const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof mongoose.Error.CastError) {
    // Handle Mongoose CastError
    return res.status(400).json({
      success: false,
      message: `Invalid ${error.path}: ${error.value}`,
    });
  }

  if (error instanceof ZodError) {
    const errorMessages = error.errors.map((issue) => {
      const message = `${issue.path.join(".")} is ${issue.message}`;
      return message;
    });
    return res
      .status(400)
      .json({ error: "Invalid Data", details: errorMessages });
  }
  console.log("error from global", error.message);
  res.status(500).json({ error: error.message });
};
app.all("*", (req, res) => {
  res.status(404).send("Sorry, the page you are looking for does not exist.");
});
app.use(errorHandler);

export default app;

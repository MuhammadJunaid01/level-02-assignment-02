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
import { errorHandler } from "./app/lib/utils/handle-errors";
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", productRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Server running on http://localhost:5000");
});

app.all("*", (req, res) => {
  res.status(404).send("Sorry, the page you are looking for does not exist.");
});
app.use(errorHandler);

export default app;

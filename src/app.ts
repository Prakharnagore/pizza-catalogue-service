import config from "config";
import express from "express";
import { globalErrorHandler } from "./common/middleware/globalErrorHandler";
import categoryRouter from "./category/category-router";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.get("/", async (req, res) => {
    res.json({ message: config.get("server.port") });
});
app.use("/categories", categoryRouter);

// error handler
app.use(globalErrorHandler);

export default app;

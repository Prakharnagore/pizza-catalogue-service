import config from "config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./common/middleware/globalErrorHandler";
import categoryRouter from "./category/category-router";
import productRouter from "./product/product-router";
import toppingRouter from "./topping/topping-router";

const app = express();

// middleware
app.use(
    cors({
        origin: "*",
    }),
);
app.use(express.json());
app.use(cookieParser());

// routes
app.get("/", async (req, res) => {
    res.json({ message: config.get("server.port") });
});
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/toppings", toppingRouter);

// error handler
app.use(globalErrorHandler);

export default app;

import config from "config";
import express from "express";
import { globalErrorHandler } from "./common/middleware/globalErrorHandler";

const app = express();

app.get("/", async (req, res) => {
    res.json({ message: config.get("server.port") });
});

app.use(globalErrorHandler);

export default app;

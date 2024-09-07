import express from "express";
import { ProductController } from "./product-controller";
import { ProductService } from "./product-service";
import createProductValidator from "./create-product-validator";
import { asyncWrapper } from "../common/utils/wrapper";
import authenticate from "../common/middleware/authenticate";
import { canAccess } from "../common/middleware/canAccess";
import { Roles } from "../common/constants";
import fileUpload from "express-fileupload";
import { S3Storage } from "../common/services/S3Storage";
import createHttpError from "http-errors";

// import logger from "../config/logger";

const router = express.Router();

const productService = new ProductService();
const storage = new S3Storage();
const productController = new ProductController(productService, storage);

router.post(
    "/",
    authenticate,
    canAccess([Roles.ADMIN]),
    fileUpload({
        limits: { fileSize: 500 * 1024 }, // 500kb
        abortOnLimit: true,
        limitHandler: (req, res, next) => {
            const error = createHttpError(400, "File size exceeds the limit");
            next(error);
        },
    }),
    createProductValidator,
    asyncWrapper(productController.create),
);

// update category
// list categories
// get single category

export default router;

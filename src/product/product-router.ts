import express from "express";
import { ProductController } from "./product-controller";
import { ProductService } from "./product-service";
import createProductValidator from "./create-product-validator";
import { asyncWrapper } from "../common/utils/wrapper";
import authenticate from "../common/middleware/authenticate";
import { canAccess } from "../common/middleware/canAccess";
import { Roles } from "../common/constants";

// import logger from "../config/logger";

const router = express.Router();

const productService = new ProductService();
const productController = new ProductController();

router.post(
    "/",
    authenticate,
    canAccess([Roles.ADMIN]),
    createProductValidator,
    asyncWrapper(productController.create),
);

// update category
// list categories
// get single category

export default router;

import express from "express";
import { singleUpload } from "../middlewares/multer.js";
import { isAdmin, isAuth } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  deleteProductImageController,
  getAllProductsController,
  getSingleProductController,
  productReviewController,
  updateProductController,
  updateProductImageController,
} from "../controllers/productController.js";

const productRouter = express.Router();

// get All products
productRouter.get("/get-all", getAllProductsController);

// get single products
productRouter.get("/:id", getSingleProductController);

// CREATE PRODUCT
productRouter.post(
  "/create",
  isAuth,
  isAdmin,
  singleUpload,
  createProductController
);

// UPDATE PRODUCT
productRouter.put("/:id", isAuth, isAdmin, updateProductController);

// UPDATE PRODUCT IMAGE
productRouter.put(
  "/image/:id",
  isAuth,
  isAdmin,
  singleUpload,
  updateProductImageController
);

// delete product image
productRouter.delete(
  "/delete-image/:id",
  isAuth,
  isAdmin,
  deleteProductImageController
);

// delete product
productRouter.delete(
  "/delete-product/:id",
  isAuth,
  isAdmin,
  deleteProductController
);

// REVIEW PRODUCT
productRouter.put("/:id/review", isAuth, productReviewController);

export default productRouter;

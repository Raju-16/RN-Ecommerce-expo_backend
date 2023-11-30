import express from "express";
import { singleUpload } from "../middlewares/multer.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  deleteProductImageController,
  getAllProductsController,
  getSingleProductController,
  updateProductController,
  updateProductImageController,
} from "../controllers/productController.js";

const productRouter = express.Router();

// get All products
productRouter.get("/get-all", getAllProductsController);

// get single products
productRouter.get("/:id", getSingleProductController);

// CREATE PRODUCT
productRouter.post("/create", isAuth, singleUpload, createProductController);

// UPDATE PRODUCT
productRouter.put("/:id", isAuth, updateProductController);

// UPDATE PRODUCT IMAGE
productRouter.put(
  "/image/:id",
  isAuth,
  singleUpload,
  updateProductImageController
);

// delete product image
productRouter.delete("/delete-image/:id", isAuth, deleteProductImageController);

// delete product
productRouter.delete("/delete-product/:id", isAuth, deleteProductController);

export default productRouter;

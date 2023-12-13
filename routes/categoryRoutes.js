import express from "express";
import { isAdmin, isAuth } from "./../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategoryController,
  getAllCategoriesController,
  updateCategoryController,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// CREATE CATEGORY
categoryRouter.post("/create", isAuth, isAdmin, createCategory);

// GET ALL CATEGORY
categoryRouter.get("/get-all", getAllCategoriesController);

// DELETE  CATEGORY
categoryRouter.delete("/delete/:id", isAuth, isAdmin, deleteCategoryController);

// UPDATE ALL CATEGORY
categoryRouter.put("/update/:id", isAuth, isAdmin, updateCategoryController);

export default categoryRouter;

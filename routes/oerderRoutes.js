import express from "express";
import { isAuth } from "./../middlewares/authMiddleware.js";
import {
  createOrderController,
  getMyOrdersCotroller,
  singleOrderDetrailsController,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// CREATE ORDERS
orderRouter.post("/create", isAuth, createOrderController);

//  GET ALL ORDERS
orderRouter.get("/my-orders", isAuth, getMyOrdersCotroller);

//  GET SINGLE ORDER DETAILS
orderRouter.get("/my-orders/:id", isAuth, singleOrderDetrailsController);

export default orderRouter;

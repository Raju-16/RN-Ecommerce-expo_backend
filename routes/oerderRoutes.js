import express from "express";
import { isAdmin, isAuth } from "./../middlewares/authMiddleware.js";
import {
  changeOrderStatusController,
  createOrderController,
  getAllOrdersController,
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

/// ======== ADMIN PART ============
// get all order
orderRouter.get("/admin/get-all-orders", isAuth, isAdmin, getAllOrdersController);

// change order status
orderRouter.put("/admin/order/:id", isAuth, isAdmin, changeOrderStatusController);

export default orderRouter;

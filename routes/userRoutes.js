import express from "express";
import {
  getUserProfileController,
  loginController,
  logoutController,
  passwordResetController,
  registerController,
  udpatePasswordController,
  updateProfileController,
  updateProfilePicController,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { singleUpload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/profile", isAuth, getUserProfileController);
userRouter.get("/logout", isAuth, logoutController);
userRouter.put("/profile-update", isAuth, updateProfileController);
userRouter.put("/update-password", isAuth, udpatePasswordController);
userRouter.put(
  "/update-picture",
  isAuth,
  singleUpload,
  updateProfilePicController
);
// FORGOT PASSWORD
userRouter.post("/reset-password", passwordResetController);

export default userRouter;

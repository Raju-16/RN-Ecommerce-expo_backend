import JWT from "jsonwebtoken";
import userMdoel from "../models/userModel.js";

// USER AUTH
export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;
  //valdiation
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "UnAuthorized User",
    });
  }
  const verifyToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await userMdoel.findById(verifyToken._id);
  next();
};

// ADMIN AUTH
export const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).send({
      success: false,
      message: "Unauthorized access (admin only)",
    });
  }
  next();
};

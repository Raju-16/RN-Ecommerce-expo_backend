import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import productRouter from "./routes/productRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import orderRouter from "./routes/oerderRoutes.js";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();

//cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const app = express();

app.use(helmet());
app.use(mongoSanitize());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/order", orderRouter);

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome To Node server </h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  await connectDb();
  console.log(`Server is running in ${process.env.NODE_ENV} mode`.green);
});

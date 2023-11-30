import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "category  is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default categoryModel = mongoose.model("Category", categorySchema);

import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    itemName: { type: String, required: true },
    itemDescription: { type: String, default: "" },
    itemImage: { type: String, default: null }, // base64 or image URL
    purchasePrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Avoid re-declaring the model if it already exists
const Product = mongoose.models.product || mongoose.model("product", productSchema);

export default Product;

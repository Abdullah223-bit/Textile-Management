import mongoose, { Schema } from "mongoose";

const recordSchema = new Schema(
  {
    itemName: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemQuantity: { type: Number, required: true },
    itemTotal: { type: Number, required: true },
    itemType: { type: String, enum: ["purchase", "sale"], required: true },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Prevent model overwrite on hot reload in dev
const Record = mongoose.models.records || mongoose.model("records", recordSchema);

export default Record;

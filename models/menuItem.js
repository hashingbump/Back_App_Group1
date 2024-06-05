import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    unit: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;

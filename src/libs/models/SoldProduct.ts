// /libs/models/SoldProduct.ts
import mongoose from "mongoose";

const SoldProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.SoldProduct || mongoose.model("SoldProduct", SoldProductSchema);

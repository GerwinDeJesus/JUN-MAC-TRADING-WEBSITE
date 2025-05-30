import { Schema, model, models } from "mongoose";

const SalesSchema = new Schema({
  date: {
    type: String,  // You can also use Date type if you prefer
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const productSchema = new Schema({
  imgSrc: {
    type: String,
    required: true,
  },
  fileKey: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  sold: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,  
  },
  expectedRestockDate: {
    type: Date,
    default: null,
  },
  sales: {
    type: [SalesSchema],  // <-- This defines an array of sales subdocuments
    default: [],
  },
});

const Product = models.Product || model("Product", productSchema);

export default Product;

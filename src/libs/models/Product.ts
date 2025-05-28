import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  imgSrc: {
    type: String,
    require: true,
  },
  fileKey: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  sold: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,  
  },
  expectedRestockDate: {
  type: Date,
  default: null,
}

});

const Product = models.Product || model("Product", productSchema);

export default Product;

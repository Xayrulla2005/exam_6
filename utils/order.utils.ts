import { Request, Response, NextFunction } from "express";
import Product from "../models/product.model.js";

export const decreaseStock = async (productId: number, quantity: number) => {
  const product = await Product.findByPk(productId);
  if (!product) throw new Error("Product not found");

  product.stock -= quantity;
  await product.save();

  return product;
};
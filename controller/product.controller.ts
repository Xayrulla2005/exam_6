import { Request,Response, NextFunction } from "express";
import {Product} from "../models/product.model.js"
import { AuthRequest } from "../middlewares/auth.middleware.js";

///// Post (only admin)
export const crateProduct=async(req:AuthRequest, res:Response,next:NextFunction)=>{
    try{
        const {name, price, stock, description, imageUrl, category}=req.body

        const product=await Product.create({
            name,
            price,
            stock,
            description,
            imageUrl,
            category,
            createdBy:req.user!.id
        });

        res.status(201).json({
            message:"Product created successfully",
            product
        })

    }catch(err){
        next(err)
    }
}

// UPDATE PRODUCT (only Admin)
export const updateProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.update(updates);

    res.json({ message: "Product updated", product });
  } catch (err) {
    next(err);
  }
};

// DELETE PRODUCT ( only Admin)
export const deleteProduct = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.destroy();

    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};

// GET ALL PRODUCTS (Public)
export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
};

// GET ONE PRODUCT (Public)
export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};
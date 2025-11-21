import { Request, Response, NextFunction } from "express";
import Wishlist from "../models/wishlist.model.js";
import Product from "../models/product.model.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

// Add 
export const addToWishlist = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const [wishlist] = await Wishlist.findOrCreate({ where: { userId: req.user!.id, productId } });

    res.status(201).json({ message: "Added to wishlist", wishlist });
  } catch (err) {
    next(err);
  }
};

// Get all
export const getWishlist = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: { userId: req.user!.id },
      include: [{ model: Product }],
    });
    res.json(wishlist);
  } catch (err) {
    next(err);
  }
};

// Remove
export const removeFromWishlist = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const deleted = await Wishlist.destroy({ where: { userId: req.user!.id, productId } });
    if (!deleted) return res.status(404).json({ message: "Not found in wishlist" });
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    next(err);
  }
};

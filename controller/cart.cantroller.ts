import { Request, Response, NextFunction } from "express";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";

// Add
export const addToCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity required" });
    }

    const cartItem = await Cart.create({
      userId: req.user!.id,
      productId: productId,
      quantity: quantity
    });

    res.status(201).json({ message: "Product added to cart", cartItem });
  } catch (err) {
    next(err);
  }
};

// Get
export const getCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: req.user!.id },
      include: [{ model: Product }],
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

// Remove
export const removeFromCart = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const deleted = await Cart.destroy({ where: { userId: req.user!.id, productId } });
    if (!deleted) return res.status(404).json({ message: "Not found in cart" });
    res.json({ message: "Removed from cart" });
  } catch (err) {
    next(err);
  }
};

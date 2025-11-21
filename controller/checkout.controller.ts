import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import Product from "../models/product.model.js";
import OrderPayment from "../models/orderPayment.model.js";
import { OrderStatus } from "../models/order.model.js";

export const checkoutOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { fullName, address, phone, paymentType } = req.body;

    // Validation
    if (!fullName || !address || !phone || !paymentType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const cartItems = await Cart.findAll({
      where: { userId: req.user!.id },
      include: [
        {
          model: Product,
        },
      ],
    });

    if (!cartItems.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total
    let totalPrice = 0;
    for (const item of cartItems) {
      if (!item.Product) {
        return res.status(400).json({ message: `Product not found for cart item ${item.id}` });
      }

      // Check stock
      if (item.Product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.Product.name}. Available: ${item.Product.stock}`,
        });
      }

      totalPrice += Number(item.Product.price) * item.quantity;
    }

    // Create Order
    const order = await Order.create({
      userId: req.user!.id,
      status: OrderStatus.PAID,
      totalPrice, 
    });

    // Create OrderItems
    for (const item of cartItems) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.Product!.price,
      });

      // Reduce stock
      item.Product!.stock -= item.quantity;
      await item.Product!.save();
    }

    // Save payment
    const payment = await OrderPayment.create({
      userId: req.user!.id,
      orderId: order.id, 
      fullName,
      address,
      phone,
      paymentType,
    });

    // Clear cart
    await Cart.destroy({ where: { userId: req.user!.id } });

    res.status(201).json({
      message: "Order placed successfully",
      order: {
        id: order.id,
        totalPrice: order.totalPrice,
        status: order.status,
      },
      payment: {
        id: payment.id,
        fullName: payment.fullName,
        paymentType: payment.paymentType,
      },
    });
  } catch (err) {
    console.error("Checkout error:", err);
    next(err);
  }
};
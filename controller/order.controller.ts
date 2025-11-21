import { Request, Response, NextFunction } from "express";
import Order from "../models/order.model.js";
import OrderItem from "../models/orderItem.model.js";
import Product from "../models/product.model.js";
import { decreaseStock } from "../utils/order.utils.js";
import { AuthRequest } from "../middlewares/auth.middleware.js";
import {User} from "../models/user.model.js";
import { OrderStatus } from "../models/order.model.js";


// User ordersini ko‘rish
export const getMyOrders = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user!.id },
      include: [
        {
          model: OrderItem,
          as: "items",
          include: [{ model: Product }],
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Admin orderlarni ko‘rish
export const getAllOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: OrderItem, as: "items", include: [{ model: Product }] },
        { model: User, as: "user" },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

// Order yaratish (user)
export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { items } = req.body; 

    if (!items || !items.length) return res.status(400).json({ message: "No items in order" });

    const order = await Order.create({ userId: req.user!.id, status: OrderStatus.PENDING });

    for (const item of items) {
      const product = await decreaseStock(item.productId, item.quantity);
      await OrderItem.create({
        orderId: order.id,
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    res.status(201).json({ message: "Order created", orderId: order.id });
  } catch (err) {
    next(err);
  }
};

//STATUS UPDATE (admin)
export const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!Object.values(OrderStatus).includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    next(err);
  }
};

// Admin order status update
export const AdminUpdateOrderStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(Number(orderId));
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", status: order.status });
  } catch (err) {
    next(err);
  }
};


import Order from "./order.model.js";
import OrderItem from "./orderItem.model.js";
import User from "./user.model.js";
import Product from "./product.model.js";

// Order -> User
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

// Order -> OrderItems
Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });

// OrderItem -> Product
OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

// OrderItem -> Order
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

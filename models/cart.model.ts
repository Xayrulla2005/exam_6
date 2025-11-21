import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./product.model.js";
import User from "./user.model.js";

interface CartAttributes {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CartCreationAttributes extends Optional<CartAttributes, "id"> {}

class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public quantity!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly Product?: Product;
  public readonly user?: User;
}

Cart.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, references: { model: User, key: "id" } },
    productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, references: { model: Product, key: "id" } },
    quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
  },
  { sequelize, tableName: "carts", timestamps: true }
);

Cart.belongsTo(User, { foreignKey: "userId", as: "user" });
Cart.belongsTo(Product, { foreignKey: "productId" });

export default Cart;
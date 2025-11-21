import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.js";
import Product from "./product.model.js";
import User from "./user.model.js";

interface WishlistAttributes {
  id: number;
  userId: number;
  productId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface WishlistCreationAttributes extends Optional<WishlistAttributes, "id"> {}

class Wishlist extends Model<WishlistAttributes, WishlistCreationAttributes> implements WishlistAttributes {
  public id!: number;
  public userId!: number;
  public productId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Wishlist.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, references: { model: User, key: "id" } },
    productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, references: { model: Product, key: "id" } },
  },
  { sequelize, tableName: "wishlists", timestamps: true }
);

// Associations
Wishlist.belongsTo(User, { foreignKey: "userId" });
Wishlist.belongsTo(Product, { foreignKey: "productId" });

export default Wishlist;

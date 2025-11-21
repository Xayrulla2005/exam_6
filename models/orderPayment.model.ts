import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.js";
import User from "./user.model.js";
import Order from "./order.model.js";

interface OrderPaymentAttributes {
  id: number;
  userId: number;
  orderId: number; 
  fullName: string;
  address: string;
  phone: string;
  paymentType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderPaymentCreationAttributes extends Optional<OrderPaymentAttributes, "id"> {}

class OrderPayment extends Model<OrderPaymentAttributes, OrderPaymentCreationAttributes> implements OrderPaymentAttributes {
  public id!: number;
  public userId!: number;
  public orderId!: number;
  public fullName!: string;
  public address!: string;
  public phone!: string;
  public paymentType!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrderPayment.init(
  {
    id: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      autoIncrement: true, 
      primaryKey: true 
    },
    userId: { 
      type: DataTypes.INTEGER.UNSIGNED, 
      allowNull: false, 
      references: { model: User, key: "id" } 
    },
    orderId: { 
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: Order, key: "id" },
    },
    fullName: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    address: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    phone: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    paymentType: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
  },
  { 
    sequelize, 
    tableName: "order_payments", 
    timestamps: true 
  }
);

OrderPayment.belongsTo(User, { foreignKey: "userId" });
OrderPayment.belongsTo(Order, { foreignKey: "orderId" });

export default OrderPayment;
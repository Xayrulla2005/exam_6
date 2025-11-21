import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isVerified: boolean;
  verificationCode?: string | null;
  verificationCodeExpires?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "user";
  isVerified?: boolean;
  verificationCode?: string;
  verificationCodeExpires?: Date;
}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "admin" | "user";
  public isVerified!: boolean;
  public verificationCode!: string | null;
  public verificationCodeExpires!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: false,
      defaultValue: "user",
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verificationCode: {
      type: DataTypes.STRING(6),
      allowNull: true,
      defaultValue: null,
    },
    verificationCodeExpires: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
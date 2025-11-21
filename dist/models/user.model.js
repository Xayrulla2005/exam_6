import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
export class User extends Model {
}
User.init({
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
}, {
    sequelize,
    tableName: "users",
    timestamps: true,
});
export default User;
//# sourceMappingURL=user.model.js.map
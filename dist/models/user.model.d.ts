import { Model } from "sequelize";
interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    createdAt?: Date;
    updatedAt?: Date;
}
interface UserCreationAttributes {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "user";
}
export declare class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default User;
//# sourceMappingURL=user.model.d.ts.map
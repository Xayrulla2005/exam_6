import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    port: Number(process.env.DB_PORT) || 5432,
});
sequelize
    .authenticate()
    .then(() => {
    console.log("DB connected");
})
    .catch((err) => {
    console.log("Database error:", err);
});
export default sequelize;
//# sourceMappingURL=db.js.map
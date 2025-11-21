import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST!,
    dialect: "postgres",
    logging: false,
    port: Number(process.env.DB_PORT) || 5432,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err: any) => {
    console.log("Database error:", err);
  });

export default sequelize;

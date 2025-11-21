import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import "./models/user.model.js"; 
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { isAdminMiddleware } from "./middlewares/isAdmin.middleware.js";
import "./models/associations.js";



dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/orders", isAdminMiddleware, orderRoutes);


// Server
const PORT = Number(process.env.PORT) || 4001;

await sequelize.sync({ alter: false });
    console.log("All tables created/updated!");

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
    } catch (err) {
        console.error("DB connection error:", err);
    }
    console.log(`Server running on port ${PORT}`);
});

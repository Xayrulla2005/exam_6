import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
dotenv.config();
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRouter);
// ...
// Server
const PORT = Number(process.env.PORT) || 4001;
app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully.");
    }
    catch (err) {
        console.error("DB connection error:", err);
    }
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=main.js.map
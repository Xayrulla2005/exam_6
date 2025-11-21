import User from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/token";
import { verifyToken } from "../utils/token";
// REGISTER
export const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser)
            return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user",
        });
        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        res.status(201).json({
            user: { id: user.id, name, email, role: user.role },
            token,
        });
    }
    catch (err) {
        next(err);
    }
};
// LOGIN
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(400).json({ message: "Invalid credentials" });
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid credentials" });
        const token = generateToken({ id: user.id, email: user.email, role: user.role });
        res.json({ user: { id: user.id, name: user.name, email, role: user.role }, token });
    }
    catch (err) {
        next(err);
    }
};
// FORGOT PASSWORD 
export const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const resetToken = generateToken({ id: user.id, email: user.email, role: user.role }, 60 * 60);
        res.json({ message: "Password reset token sent to email", resetToken }); // tokenni devda ko‘rsatish mumkin
    }
    catch (err) {
        next(err);
    }
};
// CHANGE PASSWORD
export const changePassword = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        if (!token)
            return res.status(400).json({ message: "Token required" });
        const decoded = verifyToken(token);
        const user = await User.findByPk(decoded.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        const hashedPassword = await hashPassword(newPassword);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: "Password successfully changed" });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=auth.controller.js.map
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET || "defaultsecret";
export const generateToken = (payload, expiresIn = 86400) => {
    const options = { expiresIn };
    return jwt.sign(payload, secret, options);
};
export const verifyToken = (token) => {
    return jwt.verify(token, secret);
};
//# sourceMappingURL=token.js.map
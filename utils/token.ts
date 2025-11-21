import jwt, { SignOptions } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "defaultsecret";

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

export const generateToken = (payload: JwtPayload, expiresIn: number = 86400) => {
  const options: SignOptions = { expiresIn }; 
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

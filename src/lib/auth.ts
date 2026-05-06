import jwt from "jsonwebtoken";
import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// For API Routes (Server Side)
export const signToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

// For Middleware (Edge Compatibility)
export const verifyToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
};

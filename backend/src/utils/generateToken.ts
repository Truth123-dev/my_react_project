import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "default_secret";

export function generateToken(payload: {
  id: string;
  email: string;
  role: string;
}) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

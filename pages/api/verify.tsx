import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, secretKey as string);
        const currentTime = Math.floor(Date.now() / 1000);
        if ((decoded as any).exp <= currentTime) {
            return res.status(401).json({ message: "Expired" });
        }
        return res.status(200).json({ message: "Valid" });
    } catch (e: any) {
        return res.status(401).json({ message: e.message });
    }
}
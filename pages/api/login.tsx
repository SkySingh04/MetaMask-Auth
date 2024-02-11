import { ethers } from "ethers";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { signedNonce, nonce, address } = req.body;
  if (!signedNonce || !nonce || !address) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const recoveredAddress = ethers.utils.verifyMessage(nonce, signedNonce);
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    const token = jwt.sign({ address }, secretKey as any, { expiresIn: "10m" });
    res.status(200).json({ token });
  } catch (e:any) {
    return res.status(500).json({ message: e.message });
  }
}
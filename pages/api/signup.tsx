import { ethers } from "ethers";
import { db } from "@/Utils/firebase";
import { doc, setDoc , getDoc } from "firebase/firestore";

import User from "@/models/schema";
import { NextApiRequest, NextApiResponse } from "next";

type Response = {
  message: string;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method === "POST") {
    try {
      const { name, email } = req.body;

      const userDocRef = doc(db, 'users', email);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        return res.status(400).json({ message: "User already exists" });
      }
      else{
        const wallet = await ethers.Wallet.createRandom();

        const blockChainAddress = wallet.address;
        const blockChainPrivateKey = wallet.privateKey;

        const newUser = {
            name,
            email,
            blockChainAddress,
        };

        await setDoc(userDocRef, newUser);

        res.status(200).json({message: blockChainPrivateKey});

      }

    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}



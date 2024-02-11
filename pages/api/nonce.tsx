import crypto from "crypto";
import { db } from "@/Utils/firebase";
import { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ message: "Address is required" });
  }
  try {
    // const addressExists = await db.("users").doc(address).get();
    // const docRef = doc(db, "users");
    // const docSnap = await getDoc(docRef);
    const q = query(collection(db,"users"), where("blockChainAddress", "==", address.toString()));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return res.status(404).json({ message: "Address not found" });
    }
    // const user = querySnapshot.docs[0].data();
    const nonce = crypto.randomBytes(32).toString("hex");
    res.status(200).json({ nonce });

  } catch (e: any) {
    return res.status(500).json({ message: e });
  }
}

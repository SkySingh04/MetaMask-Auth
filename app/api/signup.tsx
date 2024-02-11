import { ethers } from "ethers";
import connectDb from "@/Utils/connectDb";
import User from "@/models/schema";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

connectDb();

async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      const { name, email } = req.body;

      const existingUser =  await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const wallet = await ethers.Wallet.createRandom();

        const blockChainAddress = wallet.address;
        const blockChainPrivateKey = wallet.privateKey;

        const newUser = new User({
            name,
            email,
            blockChainAddress,
        });

        await newUser.save();

        res.status(200).json({message: blockChainPrivateKey});
        toast.success('User created successfully');
        toast.info("Private key is" + blockChainPrivateKey);

    } catch (error: any) {
      res.status(500).json({ message: error.message });
      toast.error('Error creating user' + error.message);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

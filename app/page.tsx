'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';
import { toast , ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Page = () => {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

    async function handleMetaMaskLogin() {
        if (!isMetaMaskInstalled) {
            toast.error('Please install MetaMask to continue');
            return;
        }
        try{
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        await provider.send("eth_requestAccounts", []); 
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        toast.success("Logged in with metamask");
        toast.info("Your address is " + address);

        const respose = await fetch("/api/nonce", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ address }),
        });

        if (!respose.ok) {
            const error = await respose.json();
            toast.error(error.message);
            return;
        }
        const { nonce } = await respose.json();
        console.log(nonce);
        toast.success("Nonce generated successfully: " + nonce);

        const signedNonce = await signer.signMessage(nonce);
        console.log(signedNonce);
        toast.success("Nonce signed successfully: " + signedNonce);

        const data ={signedNonce , nonce , address};
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.json();
            toast.error(error.message);
            return;
        }
        const { token } = await response.json();
        if (token === undefined ) {
            toast.error("Token not found");
            return;
        }
        console.log(token);
        toast.success("Logged in successfully with token: " + token);
        localStorage.setItem(address, token);
        // window.location.href = "/protected";
        }
        catch(e){
            toast.error("Failed to login with metamask");
        }
    }

    useEffect(() => {
        setIsMetaMaskInstalled(!!(window as any).ethereum);
    }, []);

    return (
        <div className="container mx-auto text-center mt-8 bg-gray-900 p-10 h-[50vh] border-amber-400 border w-[70vh]">
            <ToastContainer autoClose={false} theme="dark"  />
            <h1 className="text-3xl font-bold mb-6">Welcome, Please Select an option below to continue</h1>
            <div className="flex justify-center">
                <button className="bg-amber-600 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded m-5" onClick={handleMetaMaskLogin}>Login With Metamask</button>
            </div>
            <Link href="/signup">
                <button className="bg-amber-600 hover:bg-amber-900 text-white font-bold py-2 px-4 rounded m-5">Signup</button>
            </Link>
        </div>
    );
};

export default Page;

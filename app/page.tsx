'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ethers } from 'ethers';


const Page = () => {
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

    async function handleMetaMaskLogin() {
        if (!isMetaMaskInstalled) {
            alert('Please install MetaMask to continue');
            return;
        }
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
    }

    useEffect(() => {
        setIsMetaMaskInstalled(!!(window as any).ethereum);
    }, []);

    return (
        <div className="container mx-auto text-center mt-8">
            <h1 className="text-3xl font-bold mb-6">Welcome, Please Select an option below to continue</h1>
            <div className="flex justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5" onClick={handleMetaMaskLogin}>Login With Metamask</button>
            </div>
            <Link href="/signup">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5">Signup</button>
            </Link>
        </div>
    );
};

export default Page;

'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const [loading, setLoading] = useState(true);
    const [resp, setResponse] = useState("Valid");
    const router = useRouter();

    useEffect(() => {
      const checkMetamask = async () => {
        if (typeof window !== "undefined") {
          if (!(window).ethereum) {
            setLoading(false);
            setResponse("Please install MetaMask to continue");
          } else {
            await (window).ethereum.send("eth_requestAccounts", []);
            const provider = new ethers.providers.Web3Provider(
              (window).ethereum
            );
            const signer = provider.getSigner();
            const currentAddress = await signer.getAddress();
            console.log("Current address: ", currentAddress)
            const token = localStorage.getItem(currentAddress);
            if (token !== null) {
              const response = await fetch("/api/verify", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });
              const newResp = await response.json();
              setResponse(newResp.message);
              if (newResp.message !== "Valid") {
                window.localStorage.removeItem(currentAddress);
                console.log("Invalid token");
                router.push("/");
              }

            } else {
              console.log("No token found");
              router.push("/");
            }
          }
        }
      };
      checkMetamask();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;

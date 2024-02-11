'use client'

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(name, email);
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });
    const data = await response.json();
    if (response.ok) {
      toast.success('User created successfully');
      toast.info("Private key is" + data.message);
    } else {
      toast.error('Error creating user' + data.message);
    }
    console.log(data);
  };
  return (
    <div className="container mx-auto text-center mt-8 ">
      <h1 className="text-3xl font-bold mb-6">Sign up </h1>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="bg-gray-900 p-10 border-amber-200 border">
          <label htmlFor="name" className="m-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            className="border-2 border-gray-300 p-2 m-2 text-black"
            onChange={(e) => setName(e.target.value)}
          />
          <br></br>
          <label htmlFor="email" className="m-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-gray-300 p-2 m-2 text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded m-5" type="submit">
            Signup
            </button>
        </form>
      </div>
    </div>
  );
};

export default Page;

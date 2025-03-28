"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../global/Header";

const Authorization = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("access-token");
    if (!storedToken) {
      router.push("/login"); // Redirect to login if no token
    } else {
      setToken(storedToken); // Set token if exists
    }
  }, [router]);

  if (!token) {
    return null; // While redirecting to login, render nothing
  }

  const handleLogout = (msg) => {
    console.log(msg); // Just log the message if necessary
    setToken(null); // Clear token
  };

  return (
    <>
      <Header onLogout={handleLogout} />
      {children}
    </>
  );
};

export default Authorization;

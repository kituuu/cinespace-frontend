"use client"; // to use this component on the client side only (decorator)
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  // creating user state variable and setUser function to update it and setting initial state
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [usernotfound, setUsernotfound] = useState(false);
  const [errori, setErrori] = useState("");

  // method for signup
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      // console.log(response);
      // console.log(user);
      setUsernotfound((usernotfound: any) => false);
      setErrori((errori: any) => response.data.message);
      router.push("/");
    } catch (error: any) {
      // console.log("Kuch kadbadi ho gyi hai bro", error.message);
      console.log(error);
      let msg = "";
      if (error.message.includes("401")) {
        msg = "Invalid Password";
      }
      else if (error.message.includes("404")) {
        msg = "User not found"
      }
      setUsernotfound((usernotfound: any) => true);
      setErrori((errori: any) => msg);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Loading ho raha bhai" : "Login"}</h1>

      <label htmlFor="email">email</label>
      <input
        type="email"
        value={user.email}
        onChange={(e: { target: { value: any; }; }) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        value={user.password}
        onChange={(e: { target: { value: any; }; }) => setUser({ ...user, password: e.target.value })}
      />
      <p>{errori}</p>
      <button onClick={onLogin}>Login</button>
      <Link href="/signup" className="si">{"Don't have a account? Signup"}</Link>
    </div>
  );
}

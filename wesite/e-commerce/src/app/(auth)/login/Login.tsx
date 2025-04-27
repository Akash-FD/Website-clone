"use client";

import { getUser, LoginUser } from "@/lib/auth";
import { LoginTypes } from "@/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {

  const [formData, setFormData] = useState<LoginTypes>({
    email: "",
    password: "",
  });
  const router = useRouter()

  const hanldeChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await LoginUser(formData);
      localStorage.setItem("token", res.data.token);
       const userRes:any = await getUser()
       console.log(userRes);
      alert(res.data?.message);
      if (userRes?.role === "Admin"){
        router.push("/admin")
      }
      else{
        router.push("/")
      } 
     
    } catch (err) {
      alert("Login failed");
      console.log(err);
    }
  

  };

  return (
    <div className="bg-gradient-to-t from-white py-14 pb-48">
      <div className=" w-[430px] max-sm:w-[300px] max-sm:pt-3 m-auto px-8 my-10 bg-white py-6 shadow-lg shadow-neutral-500 rounded-xl">
        <h2 className="text-3xl py-5 text-blue-500">Login</h2>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="py-2 px-2 border"
            value={formData.email}
            onChange={hanldeChangeEvent}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="py-2 px-2 border"
            value={formData.password}
            onChange={hanldeChangeEvent}
          />
          <button className="bg-blue-600 text-white px-5 py-2 my-2 rounded-lg w-full m-auto hover:bg-blue-800">
            Submit
          </button>
        </form>
        <div className="text-center my-2">
          <span>if you are not Register? </span>
          <Link href="/register" className="text-blue-500">
            register
          </Link>
        </div>
      </div>
    </div>
  );
}

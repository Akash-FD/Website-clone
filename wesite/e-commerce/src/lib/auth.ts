"use client";
import { LoginTypes, RegisterTypes, User } from "@/type";
import { api } from "./api";

export const RegisterUser = (data: RegisterTypes) =>
  api.post("/auth/register", data);

export const LoginUser = (data: LoginTypes) => api.post("/auth/login", data);

export const getUser = async (): Promise<User | null> => {
  try {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) return null;
    const res = await api.get<User>("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("hello", err);
    return null;
  }
};

// components/ConditionalNavbar.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/Navbar";
import AdminNavbar from "./AdminNavbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <AdminNavbar />;
  }
  if (pathname.startsWith("/login")) {
    return null;
  }
  if (pathname.startsWith("/register")) {
    return null;
  }
  return <Navbar />;
}

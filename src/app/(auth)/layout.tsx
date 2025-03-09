"use client";
import Squares from "@/components/ui/squarebg";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { session } = useAuthStore();
  const router = useRouter();
  React.useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);
  if (session) {
    return null;
  }
  return (
    <div className="relative flex min-h-screen w-screen bg-black flex-col items-center justify-center py-12 overflow-x-hidden">
      <Squares direction="diagonal" speed={0.2} borderColor={"#444"} hoverFillColor={"#444"}/>
      <div className="relative overflow-x-hidden">{children}</div>
    </div>
  );
};
export default Layout;

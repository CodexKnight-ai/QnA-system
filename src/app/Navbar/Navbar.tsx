"use client";
import React from "react";
import Link from "next/link";
import Button1 from "@/components/ui/button1";
import Button2 from "@/components/ui/button2";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/Auth";
import slugify from "@/utils/slugify";

function Navbar() {
  const router = useRouter();
  const { user } = useAuthStore();
  return (
    <div className="w-full h-16 bg-black fixed top-0 shadow-md flex justify-between items-center px-6 z-9999 ">
      <h1 className="text-4xl font-bold text-purple-900">CurioCity</h1>
      <nav>
        <ul className="flex space-x-10">
          <Link href={"/"}>
            <Button1 text="Home" onClick={() => router.push("/")} />
          </Link>
          <Link href={"/questions"}>
            <Button1
              text="Questions"
              onClick={() => router.push("/questions")}
            />
          </Link>
        </ul>
      </nav>
      <div>
        <Button2
          text={user ? "Your Profile" : "Login"}
          onClick={
            user
              ? () => {
                  router.push(`/users/${user.$id}/${(user.name)}`);
                }
              : () => {
                  router.push(`/login`);
                }
          }
        />
      </div>
    </div>
  );
}

export default Navbar;

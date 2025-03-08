"use client";
import React from "react";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
// import Loader from "@/components/ui/loader";

function RegisterPage() {
  const { createAccount } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleregister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    const response = await createAccount(email, password, name);

    if (response.error) {
      setError(response.error.message);
    } else {
      router.push("/login");
    }
    setLoading(false);
  };

  return(
  <div>
    {error && <div className="text-red text-2xl">{error}</div>}
    {/* {loading &&  Loader()} */}

    <form onSubmit={handleregister}>
        
    </form>


  </div>
  );
}

export default RegisterPage;

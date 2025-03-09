"use client";

import Loader from "@/components/ui/Loader";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/Auth";
import {
  Home,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function UserPage() {
  const { userId, userSlug } = useParams();
  const { logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
  const router = useRouter();

  async function handleLogout() {
    try {
      setLoading(true);
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Something went wrong while logging out !!");
    } finally {
      setLoading(false);
    }
  }

  const sidebarLinks = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />,
    },
    {
      label: "Questions",
      href: `/users/${userId}/${userSlug}/questions`,
      icon: (
        <MessageSquare className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      ),
    },
    {
      label: "Users",
      href: "/users",
      icon: (
        <Users className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <Settings className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      ),
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-neutral-50 dark:bg-neutral-900">
      {loading && <Loader />}

      {/* Navbar */}
      <nav className="h-14 bg-white dark:bg-neutral-900 shadow-md px-4 flex items-center justify-between">
        {/* Sidebar Toggle Button */}
        <button
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title="Toggle Sidebar"
        >
          <Menu className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
        </button>
        <h1 className="text-lg font-bold">CurioCity</h1>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        {isSidebarOpen && (
          <Sidebar>
            <SidebarBody>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  {sidebarLinks.map((link) => (
                    <SidebarLink key={link.href} link={link} />
                  ))}
                </div>

                {/* Logout Button */}
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 p-2 rounded-md transition-all ${
                    isSidebarOpen
                      ? "text-red-600 hover:bg-red-100 dark:hover:bg-red-800 w-full justify-start"
                      : "justify-center"
                  }`}
                >
                  <LogOut className="h-5 w-5" />
                  {isSidebarOpen && (
                    <span className="transition-opacity duration-200">
                      Logout
                    </span>
                  )}
                </button>
              </div>
            </SidebarBody>
          </Sidebar>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">
              Welcome to Your Dashboard
            </h1>
            {/* Add your main content here */}
          </div>
        </main>
      </div>
    </div>
  );
}

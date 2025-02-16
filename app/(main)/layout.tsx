"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, BarChart, Users, Clock } from "lucide-react";
import { BarLoader } from "react-spinners";
import { useUser } from "@clerk/nextjs";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/meetings", label: "Meetings", icon: Users },
  { href: "/availability", label: "Availability", icon: Clock },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isLoaded } = useUser();

  return (
    <>
      {!isLoaded && <BarLoader width={"100%"} color="#22c55e" />}
      <div className="flex flex-col h-screen bg-green-50 dark:bg-gray-900 md:flex-row">
        
        {/* Sidebar for larger screens */}
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 shadow-lg">
          <nav className="mt-8">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-4 rounded-lg transition-all text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-gray-700 ${
                      pathname === item.href ? "bg-green-200 dark:bg-green-700" : ""
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3 text-green-600 dark:text-green-400" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-green-500 to-green-700 bg-clip-text text-transparent">
              {navItems.find((item) => item.href === pathname)?.label || "Dashboard"}
            </h2>
          </header>
          {children}
          
        </main>

        {/* Mobile bottom navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg">
          <ul className="flex justify-around">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex flex-col items-center py-3 transition-all ${
                    pathname === item.href ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="text-xs mt-1">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
      </div>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Settings,
  Users,
  LogOut,
  Home,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const menuItems = [
    { href: "/dashboard", icon: Home, label: "Overview" },
    { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    { href: "/dashboard/users", icon: Users, label: "Users" },
    { href: "/dashboard/profile", icon: User, label: "Profile" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside
          className={cn(
            "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
            isCollapsed ? "w-16" : "w-64"
          )}
        >
          <div className="h-full px-3 py-4 flex flex-col">
            <div className={cn(
              "flex items-center mb-8 px-2",
              isCollapsed ? "justify-center" : "justify-between"
            )}>
              {!isCollapsed && (
                <>
                  <BarChart3 className="h-6 w-6 text-primary" />
                  <span className="ml-2 text-lg font-semibold">Enterprise Kit</span>
                </>
              )}
              <Button
                variant="ghost"
                size="icon"
                className={cn("ml-auto", isCollapsed && "ml-0")}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </Button>
            </div>
            <nav className="flex-1 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                    "hover:bg-gray-100 dark:hover:bg-gray-700",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    pathname === item.href
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "text-gray-700 dark:text-gray-300",
                    isCollapsed && "justify-center"
                  )}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-colors",
                    pathname === item.href 
                      ? "text-primary" 
                      : "text-gray-500 dark:text-gray-400"
                  )} />
                  {!isCollapsed && (
                    <span className={cn(
                      "ml-2 transition-colors",
                      pathname === item.href 
                        ? "font-semibold" 
                        : "font-medium"
                    )}>
                      {item.label}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <Button
                variant="ghost"
                className={cn(
                  "w-full",
                  isCollapsed ? "justify-center" : "justify-start"
                )}
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                {!isCollapsed && <span className="ml-2">Logout</span>}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

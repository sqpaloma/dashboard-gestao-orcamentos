"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BarChart3, Home, BookOpen, Lock } from "lucide-react";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="border-b bg-background sticky top-0 z-10 w-full no-print">
      <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <BarChart3 className="h-5 w-5" />
          <span>Gerenciamento</span>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            <Link href="/" passHref>
              <Button
                variant={pathname === "/" ? "default" : "ghost"}
                size="sm"
              >
                <Home className="h-4 w-4 mr-2" />
                Início
              </Button>
            </Link>
            <Link href="/manual" passHref>
              <Button
                variant={pathname === "/manual" ? "default" : "ghost"}
                size="sm"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Manual
              </Button>
            </Link>
            <Link href="/admin/login" passHref>
              <Button
                variant={pathname.startsWith("/admin") ? "default" : "ghost"}
                size="sm"
              >
                <Lock className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden flex overflow-auto border-t px-4 py-2 gap-2">
        <Link href="/" passHref className="flex-1">
          <Button
            variant={pathname === "/" ? "default" : "ghost"}
            size="sm"
            className="w-full"
          >
            <Home className="h-4 w-4 mr-2" />
            Início
          </Button>
        </Link>
        <Link href="/manual" passHref className="flex-1">
          <Button
            variant={pathname === "/manual" ? "default" : "ghost"}
            size="sm"
            className="w-full"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Manual
          </Button>
        </Link>
        <Link href="/admin/login" passHref className="flex-1">
          <Button
            variant={pathname.startsWith("/admin") ? "default" : "ghost"}
            size="sm"
            className="w-full"
          >
            <Lock className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </nav>
  );
}

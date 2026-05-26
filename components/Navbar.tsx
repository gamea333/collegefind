"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { useCompare } from "@/hooks/useCompare";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { compareList } = useCompare();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openAuth = (tab: "login" | "signup") => {
    setAuthTab(tab);
    setIsAuthOpen(true);
  };

  const navLinkClass = (href: string) =>
    cn(
      "text-sm font-medium transition hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-600 rounded px-2 py-1",
      pathname === href || pathname.startsWith(`${href}/`)
        ? "text-brand-600"
        : "text-gray-600"
    );

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
          >
            <Image
               src="/logo.png"
               alt="CollegeFind Logo"
               width={40}
               height={40}
               className="object-contain"
            />
            <span className="text-xl font-bold">
              <span className="text-blue-600">College</span>
              <span className="text-gray-900">Find</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-6">
            <Link href="/colleges" className={navLinkClass("/colleges")}>
              Colleges
            </Link>
            <Link
              href="/compare"
              className={cn(navLinkClass("/compare"), "relative inline-flex items-center")}
            >
              <span className="relative">
                Compare
                {compareList.length > 0 && (
                  <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-600 px-1.5 text-xs font-medium text-white">
                    {compareList.length}
                  </span>
                )}
              </span>
            </Link>
            <Link href="/predictor" className={navLinkClass("/predictor")}>
              Predictor
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            {status === "authenticated" && session?.user ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-lg px-2 py-1 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name ?? "User"}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                      {(session.user.name ?? session.user.email ?? "U")
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}
                  <span className="hidden max-w-[120px] truncate text-sm font-medium text-gray-800 sm:inline">
                    {session.user.name ?? session.user.email}
                  </span>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        void signOut({ callbackUrl: "/colleges" });
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuth("login")}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-600"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => openAuth("signup")}
                  className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
      />
    </>
  );
}

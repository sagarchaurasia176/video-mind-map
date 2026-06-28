"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import SignOutForm from "@/components/ui/signout-form";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const isLoggedIn = !!session?.user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900">TopicFlow</span>
          </Link>

          {/* Right side buttons */}
          {!isPending && (
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/Dashboard"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                  >
                    Dashboard
                  </Link>
                  <SignOutForm>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Logout
                    </button>
                  </SignOutForm>
                </>
              ) : (
                <>
                  <Link
                    href="/Dashboard"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/Dashboard"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                  >
                    Get started
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

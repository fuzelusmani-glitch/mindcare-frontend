import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <header className="bg-white dark:bg-slate-800 border-b sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-emerald-200 dark:bg-emerald-700 p-2">
            <span className="sr-only">MindCare</span>
            {/* small logo text */}
            <span className="font-semibold text-lg">MindCare</span>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm hover:underline">Home</Link>
          <Link to="/contact" className="text-sm hover:underline">Contact</Link>

          {!user ? (
            <>
              <Link to="/login" className="text-sm px-3 py-1 rounded-md border">Login</Link>
              <Link to="/signup" className="text-sm px-3 py-1 rounded-md bg-emerald-600 text-white">Sign up</Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm opacity-80">Hi, {user.name}</span>
              <button onClick={onLogout} className="text-sm px-3 py-1 rounded-md border">Logout</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

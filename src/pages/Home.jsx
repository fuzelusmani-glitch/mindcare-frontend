import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <section className="rounded-2xl bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 p-8 shadow">
        <h1 className="text-3xl font-bold">Welcome to MindCare</h1>
        <p className="mt-3 text-sm opacity-80">AI-powered empathetic support, mood tracking, and easy access to professionals — private and stigma-free.</p>

        <div className="mt-6 flex gap-3">
          <Link to="/signup" className="px-4 py-2 bg-emerald-600 text-white rounded-lg">Get started — Sign up</Link>
          <Link to="/contact" className="px-4 py-2 border rounded-lg">Contact a Provider</Link>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border bg-white dark:bg-slate-800">
          <h3 className="font-medium">Conversational AI</h3>
          <p className="text-xs opacity-80 mt-2">Chat privately with the MindCare assistant anytime.</p>
        </div>

        <div className="p-4 rounded-lg border bg-white dark:bg-slate-800">
          <h3 className="font-medium">Mood Dashboard</h3>
          <p className="text-xs opacity-80 mt-2">Track trends and get insights from your check-ins.</p>
        </div>

        <div className="p-4 rounded-lg border bg-white dark:bg-slate-800">
          <h3 className="font-medium">Find a Provider</h3>
          <p className="text-xs opacity-80 mt-2">Locate local mental health professionals and book sessions.</p>
        </div>
      </section>
    </main>
  );
}

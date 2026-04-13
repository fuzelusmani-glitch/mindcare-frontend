import React, { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    setError("");
    if (!name || !email || !message) {
      setError("All fields are required.");
      return;
    }

    // Demo: we just show a success message. Replace with API call:
    // fetch('/api/contact', { method: 'POST', body: JSON.stringify({name,email,message}) })
    setSent(true);
    setName(""); setEmail(""); setMessage("");
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">Contact Us</h2>
        <p className="text-xs opacity-80 mt-1">Ask about providers, bookings, or privacy — we’ll respond quickly.</p>

        <form onSubmit={submit} className="mt-4 space-y-3" aria-label="contact form">
          {error && <div role="alert" className="text-rose-600 text-sm">{error}</div>}
          {sent && <div role="status" className="text-emerald-600 text-sm">Message sent — we’ll reply soon.</div>}

          <label className="block text-sm">
            <span className="text-xs">Your name</span>
            <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-md border" />
          </label>

          <label className="block text-sm">
            <span className="text-xs">Email</span>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-md border" />
          </label>

          <label className="block text-sm">
            <span className="text-xs">Message</span>
            <textarea value={message} onChange={e=>setMessage(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-md border" rows="5"></textarea>
          </label>

          <button className="px-4 py-2 bg-emerald-600 text-white rounded-md">Send message</button>
        </form>
      </div>
    </main>
  );
}

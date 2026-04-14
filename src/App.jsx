// App.jsx (fixed)
import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Send, Heart, Info } from "lucide-react";
const API_URL ="http://localhost:4000/api";





// Single-file App.jsx that merges the original MindCare UI into a routed app
// Pages included: Home, Login, Signup, Contact, Dashboard (chat + mood + doctors)
// NOTE: This file expects Tailwind, Recharts, Framer Motion and lucide-react to be installed.

function Navbar({ user, onLogout }) {
  return (
    <header className="bg-white dark:bg-slate-800 border-b sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-emerald-200 dark:bg-emerald-700 p-2">
            <Heart size={18} aria-hidden="true" />
          </div>
          <div>
            <div className="font-semibold text-lg">MindCare</div>
            <div className="text-xs opacity-70">AI mental health support</div>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/" className="text-sm hover:underline">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm hover:underline">
            Dashboard
          </Link>
          <Link to="/contact" className="text-sm hover:underline">
            Contact
          </Link>
          {!user ? (
            <>
              <Link to="/login" className="text-sm px-3 py-1 rounded-md border">
                Login
              </Link>
              <Link to="/signup" className="text-sm px-3 py-1 rounded-md bg-emerald-600 text-white">
                Sign up
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm opacity-80">Hi, {user.name}</span>
              <button onClick={onLogout} className="text-sm px-3 py-1 rounded-md border">
                Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

/* ----------------------- Pages ----------------------- */

function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <section className="rounded-2xl bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 p-8 shadow">
        <h1 className="text-3xl font-bold">Welcome to MindCare</h1>
        <p className="mt-3 text-sm opacity-80">
          AI-powered empathetic support, mood tracking, and easy access to professionals — private and
          stigma-free.
        </p>

        <div className="mt-6 flex gap-3">
          <Link to="/signup" className="px-4 py-2 bg-emerald-600 text-white rounded-lg">
            Get started — Sign up
          </Link>
          <Link to="/contact" className="px-4 py-2 border rounded-lg">
            Contact a Provider
          </Link>
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

function Login({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Please fill both email and password.");
    return;
  }

  try {
    console.log("📡 LOGIN API CALL");

    const response = await fetch("https://mindcare-backend-71f2.onrender.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("✅ LOGIN RESPONSE:", data);

    if (!response.ok) {
      setError(data.message || "Invalid credentials");
      return;
    }

    const authUser = data.user;

    localStorage.setItem("mindcare_user", JSON.stringify(authUser));
    onAuth && onAuth(authUser);
    navigate("/dashboard");
  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);
    setError("Unable to connect to the server.");
  }
}
  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">Login</h2>
        <p className="text-xs opacity-80 mt-1">Welcome back — we’re glad you’re here.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3" aria-label="login form">
          {error && (
            <div role="alert" className="text-sm text-rose-600">
              {error}
            </div>
          )}

          <label className="block text-sm">
            <span className="text-xs">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md border focus:ring-2 focus:ring-emerald-200"
              required
            />
          </label>

          <label className="block text-sm">
            <span className="text-xs">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md border"
              required
            />
          </label>

          <div className="flex items-center justify-between">
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-md">Sign in</button>
            <Link to="/signup" className="text-sm underline">
              Create an account
            </Link>
          </div>
        </form>

        <p className="text-xs opacity-70 mt-3">We keep your data private. See privacy settings in the footer.</p>
      </div>
    </main>
  );
}

function Signup({ onAuth }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
  e.preventDefault();
  setError("");

  if (!name || !email || !password) {
    setError("Please fill all fields.");
    return;
  }

  if (!agree) {
    setError("Please accept privacy terms.");
    return;
  }

  try {
    console.log("📡 SIGNUP API CALL");

    const response = await fetch("https://mindcare-backend-71f2.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    console.log("✅ SIGNUP RESPONSE:", data);

    if (!response.ok) {
      setError(data.message || "Signup failed");
      return;
    }

    const authUser = data.user || { name, email };

    localStorage.setItem("mindcare_user", JSON.stringify(authUser));
    onAuth && onAuth(authUser);
    navigate("/dashboard");
  } catch (error) {
    console.error("❌ SIGNUP ERROR:", error);
    setError("Unable to connect to the server.");
  }
}

  return (
    <main className="max-w-md mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">Create an account</h2>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3" aria-label="signup form">
          {error && (
            <div role="alert" className="text-sm text-rose-600">
              {error}
            </div>
          )}

          <label className="block text-sm">
            <span className="text-xs">Full name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-md border" />
          </label>

          <label className="block text-sm">
            <span className="text-xs">Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-md border" />
          </label>

          <label className="block text-sm">
            <span className="text-xs">Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-md border" />
          </label>

          <label className="flex items-start gap-2 text-xs mt-2">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>
              I agree to the <strong>privacy terms</strong> — data is encrypted and only shared with consent.
            </span>
          </label>

          <button className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md">Create account</button>
        </form>
      </div>
    </main>
  );
}

function Contact() {
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
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">Contact Us</h2>
        <p className="text-xs opacity-80 mt-1">Ask about providers, bookings, or privacy — we’ll respond quickly.</p>

        <form onSubmit={submit} className="mt-4 space-y-3" aria-label="contact form">
          {error && (
            <div role="alert" className="text-rose-600 text-sm">
              {error}
            </div>
          )}
          {sent && (
            <div role="status" className="text-emerald-600 text-sm">
              Message sent — we’ll reply soon.
            </div>
          )}

          <label className="block text-sm">
            <span className="text-xs">Your name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-md border" />
          </label>

          <label className="block text-sm">
            <span className="text-xs">Email</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-md border" />
          </label>

          <label className="block text-sm">
            <span className="text-xs">Message</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-md border" rows="5"></textarea>
          </label>

          <button className="px-4 py-2 bg-emerald-600 text-white rounded-md">Send message</button>
        </form>
      </div>
    </main>
  );
}

/* ----------------------- Dashboard (original MindCare UI integrated) ----------------------- */

function Dashboard({ user }) {
  // Chat
  const [messages, setMessages] = useState([
    { id: 1, from: "ai", text: "Hi there — I'm MindCare. How are you feeling today?", time: "09:00" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Mood data
  const [moodData, setMoodData] = useState(generateMockMoodData());
  const [selectedMetric, setSelectedMetric] = useState("mood");

  // Doctor locator
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [nearbyDoctors] = useState(generateMockDoctors());

  useEffect(() => {
    document.documentElement.lang = "en";
  }, []);

 async function handleSend() {
  if (!input.trim()) return;
  const outgoing = { id: Date.now(), from: "user", text: input.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
  setMessages(m => [...m, outgoing]);
  setInput("");

  try {
    // Build messages array using previous chat context for more coherent replies
    const payloadMessages = [
      { role: "system", content: "You are MindCare, an empathetic mental health assistant. Be supportive and non-judgmental." },
      // Map existing messages into API format
      ...messages.map(m => ({ role: m.from === "user" ? "user" : "assistant", content: m.text })),
      { role: "user", content: outgoing.text }
    ];

    const resp = await fetch("http://localhost:4000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: payloadMessages })
    });

    const json = await resp.json();
    const aiText = json.reply || "Sorry, something went wrong.";

    setMessages(m => [...m, { id: Date.now()+1, from: "ai", text: aiText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  } catch (err) {
    console.error(err);
    setMessages(m => [...m, { id: Date.now()+1, from: "ai", text: "I’m having trouble connecting right now. Please try again later.", time: new Date().toLocaleTimeString() }]);
  }
}


  function updateMood(score) {
    const newPoint = { date: new Date().toLocaleDateString(), mood: Math.max(-3, Math.min(3, score)) };
    setMoodData((d) => [...d.slice(-29), newPoint]);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left pane: Chat */}
      <section className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-2xl shadow p-4 flex flex-col h-[70vh]" aria-labelledby="chat-heading">
        <div className="flex items-start justify-between">
          <div>
            <h2 id="chat-heading" className="text-lg font-semibold">
              Talk to MindCare
            </h2>
            <p className="text-xs opacity-80">Confidential, empathetic AI support — here to listen.</p>
          </div>
          <div className="text-xs opacity-70 flex items-center gap-2">
            <Info size={16} />
            <span>All conversations are private • End-to-end encrypted.</span>
          </div>
        </div>

        <div className="mt-3 flex-1 overflow-y-auto px-1" role="log" aria-live="polite">
          <AnimatePresence initial={false} mode="popLayout">
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.28 }} className={`mb-3 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`${msg.from === "user" ? "bg-emerald-600 text-white rounded-lg rounded-br-sm" : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg rounded-bl-sm"} px-4 py-2 max-w-[85%] break-words shadow-sm`}>
                  <div className="text-sm">{msg.text}</div>
                  <div className="text-2xs opacity-60 mt-1 text-right">{msg.time}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              aria-label="Type your message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              className="flex-1 px-3 py-2 rounded-lg border focus:ring-2 focus:ring-emerald-200 dark:bg-slate-900 dark:border-slate-700"
              placeholder="I'm feeling..."
            />
            <button onClick={handleSend} aria-label="Send message" className="p-2 rounded-lg bg-emerald-600 text-white hover:brightness-95 focus:ring-2 focus:ring-emerald-300">
              <Send />
            </button>
          </div>

          <div className="mt-2 flex items-center gap-3 text-xs opacity-80">
            <button onClick={() => updateMood(2)} className="px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/30">
              I'm okay
            </button>
            <button onClick={() => updateMood(-1)} className="px-2 py-1 rounded-md bg-amber-50 dark:bg-amber-900/30">
              A bit down
            </button>
            <button onClick={() => updateMood(-3)} className="px-2 py-1 rounded-md bg-rose-50 dark:bg-rose-900/20">
              Need urgent help
            </button>
          </div>
        </div>
      </section>

      {/* Center pane: Mood Dashboard */}
      <section className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-2xl shadow p-4 h-[70vh] flex flex-col" aria-labelledby="dashboard-heading">
        <div className="flex items-start justify-between">
          <div>
            <h2 id="dashboard-heading" className="text-lg font-semibold">
              Mood Dashboard
            </h2>
            <p className="text-xs opacity-80">See trends and insights from your mood check-ins.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-xs opacity-80">Metric:</label>
            <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)} className="rounded-md p-1 bg-slate-50 dark:bg-slate-700">
              <option value="mood">Mood Score</option>
              <option value="sleep">Sleep Quality</option>
              <option value="energy">Energy</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex-1 grid grid-rows-2 gap-4">
          <div className="row-span-1 rounded-lg p-3 bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-slate-800/60 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Last 30 days</p>
                <h3 className="text-2xl font-semibold">Emotional trend</h3>
              </div>
              <div className="text-xs opacity-75">
                <p>Interactive • Hover or tap points to see details</p>
              </div>
            </div>

            <div className="mt-3 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="date" hide />
                  <YAxis domain={[-3, 3]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="mood" stroke="#10B981" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="row-span-1 grid grid-cols-2 gap-4">
            <div className="rounded-lg p-3 bg-white dark:bg-slate-700 shadow-sm">
              <h4 className="text-sm font-medium">Mood Distribution</h4>
              <div className="mt-3 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={aggregateMoodBuckets(moodData)}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-xs opacity-80">Tap a bar to filter the trend (coming soon)</div>
            </div>

            <div className="rounded-lg p-3 bg-white dark:bg-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-medium">Quick Insights</h4>
                <ul className="mt-2 space-y-2 text-xs">
                  <li>
                    • Average mood this month: <strong>{calcAvgMood(moodData).toFixed(2)}</strong>
                  </li>
                  <li>
                    • Most frequent feeling: <strong>{mostFrequentMood(moodData)}</strong>
                  </li>
                  <li>
                    • Recorded entries: <strong>{moodData.length}</strong>
                  </li>
                </ul>
              </div>
              <div className="mt-3 text-xs opacity-70">Export & privacy controls available in settings.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Right pane: Doctor Locator */}
      <section className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl shadow p-4 h-[70vh] flex flex-col" aria-labelledby="locator-heading">
        <div className="flex items-start justify-between">
          <div>
            <h2 id="locator-heading" className="text-lg font-semibold">
              Find a Provider
            </h2>
            <p className="text-xs opacity-80">Locate nearby mental health professionals and quick-book a call.</p>
          </div>
          <button className="text-xs opacity-80 underline" onClick={() => alert("Open filter modal (integration)")}>
            Filters
          </button>
        </div>

        <div className="mt-3 flex-1 flex flex-col gap-3">
          <div className="rounded-md overflow-hidden border">
            <DoctorMapPlaceholder doctors={nearbyDoctors} onSelect={setSelectedDoctor} />
          </div>

          <div className="overflow-auto space-y-3">
            {nearbyDoctors.map((doc) => (
              <article
                key={doc.id}
                tabIndex={0}
                role="button"
                onClick={() => setSelectedDoctor(doc)}
                className="p-3 rounded-lg border hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-xs opacity-75">
                      {doc.specialty} • {doc.distance} km
                    </p>
                  </div>
                  <div className="text-sm opacity-80">{doc.rating} ★</div>
                </div>
                <div className="mt-2 text-xs opacity-70">{doc.bio}</div>
              </article>
            ))}
          </div>

          <div className="mt-2">
            <button className="w-full rounded-lg py-2 bg-emerald-600 text-white shadow" onClick={() => alert("Open booking flow (integration)")}>
              Book a Session
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ----------------------- Helper components & functions ----------------------- */

function DoctorMapPlaceholder({ doctors, onSelect }) {
  return (
    <div className="h-40 bg-gradient-to-br from-sky-50 to-emerald-50 dark:from-slate-700 dark:to-slate-800 rounded-md p-3 flex flex-col justify-center items-start">
      <div className="flex items-center gap-2">
        <MapPin />
        <div>
          <div className="text-sm font-medium">Map preview</div>
          <div className="text-xs opacity-70">Integrate Mapbox or Leaflet. Click a marker to view provider.</div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {doctors.slice(0, 3).map((d) => (
          <button key={d.id} onClick={() => onSelect(d)} className="px-2 py-1 rounded-md bg-white dark:bg-slate-700 border text-xs">
            {d.name.split(" ")[0]}
          </button>
        ))}
      </div>
    </div>
  );
}

function generateMockMoodData() {
  const arr = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    arr.push({ date: date.toLocaleDateString(), mood: +((Math.sin(i / 4) * 1.4 + (Math.random() - 0.5)).toFixed(2)) });
  }
  return arr;
}

function aggregateMoodBuckets(data) {
  const buckets = { Good: 0, Neutral: 0, Low: 0 };
  data.forEach((d) => {
    if (d.mood >= 1) buckets.Good++;
    else if (d.mood > -1) buckets.Neutral++;
    else buckets.Low++;
  });
  return [{ name: "Good", count: buckets.Good }, { name: "Neutral", count: buckets.Neutral }, { name: "Low", count: buckets.Low }];
}

function calcAvgMood(data) {
  if (!data.length) return 0;
  const s = data.reduce((a, b) => a + b.mood, 0);
  return s / data.length;
}

function mostFrequentMood(data) {
  if (!data.length) return "—";
  const buckets = { good: 0, neutral: 0, low: 0 };
  data.forEach((d) => {
    if (d.mood >= 1) buckets.good++;
    else if (d.mood > -1) buckets.neutral++;
    else buckets.low++;
  });
  const max = Object.keys(buckets).reduce((a, b) => (buckets[a] > buckets[b] ? a : b));
  return max.charAt(0).toUpperCase() + max.slice(1);
}

function generateFriendlyReply(userText) {
  const prompts = [
    "Thanks for sharing — that sounds like a lot. Want to tell me more?",
    "I hear you. On a scale of 1–10, how intense is that feeling right now?",
    "I'm here with you. Would you like a breathing exercise or a reflective prompt?",
    "That's understandable. Would you like resources or to find a professional nearby?",
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
}

function generateMockDoctors() {
  return [
    { id: 1, name: "Dr. Asha Verma", specialty: "Clinical Psychologist", distance: 1.2, rating: 4.7, bio: "CBT, trauma-informed therapy" },
    { id: 2, name: "Dr. Rohan Mehta", specialty: "Psychiatrist", distance: 2.4, rating: 4.6, bio: "Medication management, mood disorders" },
    { id: 3, name: "Dr. Maya Singh", specialty: "Counselor", distance: 3.1, rating: 4.5, bio: "Couples therapy, mindfulness" },
  ];
}

/* ----------------------- Root App ----------------------- */

export default function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const s = localStorage.getItem("mindcare_user");
    if (s) setUser(JSON.parse(s));
  }, []);

  function handleAuth(u) {
    setUser(u);
  }
  function handleLogout() {
    localStorage.removeItem("mindcare_user");
    setUser(null);
  }

  return (
    <BrowserRouter>
      <div className={`min-h-screen antialiased ${darkMode ? "bg-slate-900 text-slate-100" : "bg-gradient-to-b from-sky-50 via-emerald-50 to-white text-slate-900"}`}>
        <Navbar user={user} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onAuth={handleAuth} />} />
          <Route path="/signup" element={<Signup onAuth={handleAuth} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
        </Routes>

        <footer className="max-w-7xl mx-auto px-4 py-4 text-xs text-center opacity-80">
          <div className="flex items-center justify-center gap-3">
            <div>MindCare respects your privacy. Sensitive data is stored encrypted and shared only with your consent.</div>
            <button onClick={() => setShowOnboarding(true)} className="underline">
              Privacy settings
            </button>
          </div>
        </footer>

        <AnimatePresence>
          {showOnboarding && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/30" aria-hidden />
              <motion.div initial={{ y: 20, scale: 0.99 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="rounded-full p-3 bg-emerald-100 dark:bg-emerald-900/30">
                    <Heart />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Welcome to MindCare</h3>
                    <p className="text-sm opacity-80 mt-1">MindCare uses AI to provide empathetic conversational support. We keep your data private and give you control over sharing with providers.</p>

                    <ul className="mt-3 text-sm space-y-2">
                      <li>• Conversations are encrypted end-to-end.</li>
                      <li>• Your mood history stays private unless you choose to share.</li>
                      <li>• You can export or delete your data anytime.</li>
                    </ul>

                    <div className="mt-4 flex items-center gap-3">
                      <button onClick={() => setShowOnboarding(false)} className="px-4 py-2 rounded-lg bg-emerald-600 text-white">
                        Got it
                      </button>
                    </div>

                    <div className="mt-3 text-xs opacity-70">
                      Tip: Press <kbd className="px-2 py-1 rounded bg-slate-100">c</kbd> to focus the chat input.
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}

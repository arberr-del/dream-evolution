import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, ADMIN_EMAIL } from "./firebase/config";
import { useFirestoreCollection } from "./hooks/useFirestoreCollection";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Events from "./components/Events";
import ApplySection from "./components/ApplySection";
import Artists from "./components/Artists";
import Contact from "./components/Contact";
import AdminPanel from "./components/AdminPanel";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import EventsPage from "./pages/EventsPage";

// Smooth-scroll that accounts for the fixed nav height
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = document.querySelector(".nav")?.offsetHeight || 64;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

function HomePage({
  user,
  events,
  evLoading,
  artists,
  arLoading,
  setEvents,
  setArtists,
  isAdmin,
}) {
  return (
    <main style={{ paddingTop: "60px" }}>
      <Hero />
      <Events events={events} loading={evLoading} />
      <ApplySection user={user} />
      <Artists artists={artists} loading={arLoading} />
      <Contact />
      {isAdmin && (
        <AdminPanel
          events={events}
          setEvents={setEvents}
          artists={artists}
          setArtists={setArtists}
        />
      )}
    </main>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const {
    data: events,
    loading: evLoading,
    setData: setEvents,
  } = useFirestoreCollection("events");
  const {
    data: artists,
    loading: arLoading,
    setData: setArtists,
  } = useFirestoreCollection("artists");

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  const handleLogin = () =>
    signInWithPopup(auth, googleProvider).catch(console.error);
  const handleLogout = () => signOut(auth).catch(console.error);

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5F0D8",
        }}
      >
        <div
          className="spinner"
          style={{ borderColor: "#ccc", borderTopColor: "#111" }}
        />
      </div>
    );
  }

  return (
    <>
      <Nav
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        isAdmin={isAdmin}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              user={user}
              events={events}
              evLoading={evLoading}
              artists={artists}
              arLoading={arLoading}
              setEvents={setEvents}
              setArtists={setArtists}
              isAdmin={isAdmin}
            />
          }
        />
        <Route path="/za-nas" element={<AboutPage />} />
        <Route path="/nastani" element={<EventsPage />} />
      </Routes>

      <Footer />
    </>
  );
}

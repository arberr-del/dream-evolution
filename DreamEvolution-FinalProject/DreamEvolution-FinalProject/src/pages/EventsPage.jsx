import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useFirestoreCollection } from "../hooks/useFirestoreCollection";
import ImageWithFallback from "../components/ImageWithFallback";
import "./EventsPage.css";
import eventsHero from '../images/Events-Hero.png';
import { getImageSrc } from "../utils/getImageSrc";

// ── PLACEHOLDER DATA ──────────────────────────────────────
const PLACEHOLDER_FUTURE = [
  {
    id: "f1",
    title: "Нота Фест",
    date: "2026",
    imageUrl: "",
    description:
      "Градските sидови се претвораат во живо платно каде современата уметност раскажува нови приказни, оставајќи трајна визуелна и емоционална трага во просторот. Секое дело ја трансформира обичната архитектура во простор за креативно изразување и јавна комуникација, каде што традиционалните граници меѓу галеријата и улицата се бришат.",
  },
  {
    id: "f2",
    title: "Трам Фест",
    date: "2027",
    imageUrl: "",
    description:
      "Курирани современи уметнички дела што отвораат простор за размисла, дијалог и лично доживување, создавајќи тивка, но моќна врска со публиката. Вакво селектирање на дела повикува на автентична ангажираност, каде прашањата се еднакво важни како и одговорите.",
  },
  {
    id: "f3",
    title: "Арт Сити Фест",
    date: "2028",
    imageUrl: "",
    description:
      "Меѓународен фестивал на уличната уметност и графити кој ги трансформира јавните простори во жива галерија на отворено. Уметници од цел свет ги оживуваат градските ѕидови.",
  },
];

const PLACEHOLDER_PAST = [
  {
    id: "p1",
    title: "Арт Сити",
    year: "2025",
    imageUrl: "",
    description:
      "Проект što ја преосмисли употребата на познати урбани локации, трансформирајќи ги во простори за неочекувани елементи и размислувања. Преку минимални интервенции—боја, светлина, и звук—секој простор доби нов идентитет и нова енергија која ги поканува минувачите да застанат и да размислат.",
  },
  {
    id: "p2",
    title: "Еволуција на сонот",
    year: "2024",
    imageUrl: "",
    description:
      "Серија од уметнички дела što го испита напонот меѓу наследството и современоста, користејќи традиционални уметнички техники во контекст на денешницата. Секое дело беше мост меѓу минатото и иднината, меѓу традицијата и иновацијата.",
  },
  {
    id: "p3",
    title: "Back To the Style",
    year: "2023",
    imageUrl: "",
    description:
      "Проект što ја користише природната и вештачката светлина како главен медиум, создавајќи имерзивни искуства što се менуваа со времето на денот. Светлосата не беше само инструмент, туку централниот јазик на изразување.",
  },
  {
    id: "p4",
    title: "Borgo",
    year: "2022",
    imageUrl: "",
    description:
      "Проект на графити što ги трансформираше градските ѕидови во наративни платна, каде боја, форма и симболика се комбинираа за создавање на визуелни приказни кои ги рефлектираат идентитетот и историјата на заедницата.",
  },
];

// ── APPLY FORM (per future event) ────────────────────────
function ApplyForm({ eventId, eventTitle }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "applications"), {
        ...form,
        eventId,
        eventTitle,
        createdAt: new Date(),
      });
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="ep-apply-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Име и презиме</label>
        <input
          type="text"
          name="name"
          placeholder="Вашето ime"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Е-пошта</label>
        <input
          type="email"
          name="email"
          placeholder="vasa@email.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Порака</label>
        <textarea
          name="message"
          placeholder="Кажете ни повеќе за себе..."
          value={form.message}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="btn btn-cream ep-future-btn"
        disabled={loading}
      >
        {loading ? "Се испраќа..." : "Пријави се на настанот"}
      </button>
      {status === "success" && (
        <div className="success-msg">✓ Вашата пријава е успешно испратена!</div>
      )}
      {status === "error" && (
        <div className="error-msg">✗ Грешка. Обидете се повторно.</div>
      )}
    </form>
  );
}

// ── FUTURE EVENT CARD ─────────────────────────────────────
function FutureEventCard({ event }) {
  return (
    <article className="ep-future-card">
      <div className="ep-future-inner">
        <div className="ep-future-img-wrap">
          <ImageWithFallback src={getImageSrc(event.imageUrl)} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          <div className="ep-future-sidebar">
            <span className="ep-future-sidebar-title">{event.title}</span>
            <span className="ep-future-sidebar-year">{event.date}</span>
          </div>
        </div>
        <div className="ep-future-body">
          <p className="ep-future-desc">{event.description}</p>
          <ApplyForm eventId={event.id} eventTitle={event.title} />
        </div>
      </div>
    </article>
  );
}

// ── PAST EVENT MODAL ──────────────────────────────────────
function PastEventModal({ event, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        <div className="ep-past-modal-img">
          <ImageWithFallback src={getImageSrc(event.imageUrl)} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <h2>{event.title}</h2>
        {event.date && <div className="modal-date">{event.date}</div>}
        <p>{event.description}</p>
      </div>
    </div>
  );
}

// ── PAST EVENT CARD ───────────────────────────────────────
function PastEventCard({ event }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <article className="ep-past-card" onClick={() => setOpen(true)}>
        <div className="ep-past-img-wrap">
          <ImageWithFallback src={getImageSrc(event.imageUrl)} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div className="ep-past-label">
            <span className="ep-past-label-title">{event.title}</span>
            <span className="ep-past-label-year">{event.date}</span>
          </div>
        </div>
        <p className="ep-past-desc">{event.description}</p>
      </article>
      {open && <PastEventModal event={event} onClose={() => setOpen(false)} />}
    </>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────
export default function EventsPage() {
  const { data: dbEvents, loading } = useFirestoreCollection("events");

  const [futureEvents, setFutureEvents] = useState(PLACEHOLDER_FUTURE);
  const [pastEvents, setPastEvents] = useState(PLACEHOLDER_PAST);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (dbEvents && dbEvents.length > 0) {
      // Filter based on the explicit status
      const future = dbEvents.filter((e) => e.status === "future");
      const past = dbEvents.filter((e) => e.status === "past");

      // Update state, keeping placeholders if no DB matches are found
      if (future.length > 0) {
        setFutureEvents(future);
      } else {
        setFutureEvents([]); // Clear placeholders if DB is connected but empty
      }

      if (past.length > 0) {
        setPastEvents(past);
      } else {
        setPastEvents([]); // Clear placeholders if DB is connected but empty
      }
    }
  }, [dbEvents]);

  return (
    <main className="ep-page">
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="ep-hero">
        <div className="ep-hero-img">
          <img src={eventsHero} alt="Events Hero" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="ep-hero-text">
          <h1 className="ep-hero-title">БИДИ ДЕЛ ОД НАШИТЕ ИДНИ НАСТАНИ</h1>
          <p className="ep-hero-sub">
            Секој уметник или ентузијаст на уметноста е добредојден. Разгледај
            ги нашите идни настани и регистрирај се!
          </p>
        </div>
      </section>

      {/* ── FUTURE EVENTS ─────────────────────────────── */}
      <section className="ep-section ep-section--future">
        <h2 className="ep-section-title">ИДНИ НАСТАНИ</h2>
        {loading ? (
          <div className="loading">
            <div
              className="spinner"
              style={{ borderColor: "#ccc", borderTopColor: "#111" }}
            />
          </div>
        ) : (
          <div className="ep-future-list">
            {futureEvents.map((ev) => (
              <FutureEventCard key={ev.id} event={ev} />
            ))}
          </div>
        )}
      </section>

      {/* ── PAST EVENTS ───────────────────────────────── */}
      <section className="ep-section ep-section--past">
        <h2 className="ep-section-title">МИНАТИ НАСТАНИ</h2>
        {loading ? (
          <div className="loading">
            <div
              className="spinner"
              style={{ borderColor: "#ccc", borderTopColor: "#111" }}
            />
          </div>
        ) : (
          <div className="ep-past-grid">
            {pastEvents.map((ev) => (
              <PastEventCard key={ev.id} event={ev} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

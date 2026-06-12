import { useState } from "react";
import { Link } from "react-router-dom";
import ImageWithFallback from "./ImageWithFallback";
import "./Events.css";
import { getImageSrc } from "../utils/getImageSrc";
function EventModal({ event, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        {event.imageUrl && (
          <ImageWithFallback
            src={getImageSrc(event.imageUrl)}
            alt={event.title}
            style={{
              width: "100%",
              height: 220,
              objectFit: "contain",
              marginBottom: "1.5rem",
            }}
          />
        )}
        <h2>{event.title}</h2>
        {event.date && <div className="modal-date">{event.date}</div>}
        <p>{event.description}</p>
      </div>
    </div>
  );
}

export default function Events({ events, loading }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <section id="events">
      <h2 className="section-title">НАСТАНИ</h2>

      {loading ? (
        <div className="loading">
          <div
            className="spinner"
            style={{ borderTopColor: "#111", borderColor: "#ccc" }}
          />
        </div>
      ) : (
        <div className="events-grid">
          {/* Filter for current events before mapping */}
          {(events || [])
            .filter((ev) => ev.status === "current" || !ev.status) // Fallback for old events
            .map((ev) => (
              <div
                key={ev.id}
                className="event-card"
                onClick={() => setSelectedEvent(ev)}
              >
                {/* Keep your existing card rendering here */}
                <div className="event-card-img">
                  <ImageWithFallback src={getImageSrc(ev.imageUrl)} alt={ev.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div className="event-card-body">
                  {ev.date && <div className="event-card-date">{ev.date}</div>}
                  <div className="event-card-title">{ev.title}</div>
                  <div className="event-card-desc">{ev.description}</div>
                </div>
              </div>
            ))}
        </div>
      )}

      <div className="events-footer">
        <Link to="/nastani" className="btn btn-outline">
          Видете ги сите настани →
        </Link>
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}

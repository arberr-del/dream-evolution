import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";
import "./AdminPanel.css";

export default function AdminPanel({ events, setEvents, artists, setArtists }) {
  const [tab, setTab] = useState("events");
  const [messages, setMessages] = useState([]);
  const [msgLoading, setMsgLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    imageUrl: "",
    status: "current",
  });
  const [newArtist, setNewArtist] = useState({ name: "", imageUrl: "" });

  useEffect(() => {
    if (tab === "messages") {
      setMsgLoading(true);
      getDocs(collection(db, "messages"))
        .then((snap) =>
          setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
        )
        .catch(() => {})
        .finally(() => setMsgLoading(false));
    }
  }, [tab]);

  const addEvent = async () => {
    if (!newEvent.title) return;
    try {
      const ref = await addDoc(collection(db, "events"), {
        ...newEvent,
        createdAt: new Date(),
      });
      setEvents((prev) => [{ id: ref.id, ...newEvent }, ...(prev || [])]);
      setNewEvent({ title: "", description: "", date: "", imageUrl: "", status: "current" });
    } catch (e) {
      alert("Firebase error: " + e.message);
    }
  };

  const addArtist = async () => {
    if (!newArtist.name) return;
    try {
      const ref = await addDoc(collection(db, "artists"), {
        ...newArtist,
        createdAt: new Date(),
      });
      setArtists((prev) => [{ id: ref.id, ...newArtist }, ...(prev || [])]);
      setNewArtist({ name: "", imageUrl: "" });
    } catch (e) {
      alert("Firebase error: " + e.message);
    }
  };

  const deleteItem = async (colName, id, setter) => {
    if (!window.confirm("Сигурно сакате да избришете?")) return;
    try {
      await deleteDoc(doc(db, colName, id));
      setter((prev) => prev.filter((i) => i.id !== id));
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  const saveEdit = async () => {
    const { _collection, id, ...data } = editItem;
    try {
      await updateDoc(doc(db, _collection, id), data);
      if (_collection === "events") {
        setEvents((prev) => prev.map((i) => (i.id === id ? editItem : i)));
      } else {
        setArtists((prev) => prev.map((i) => (i.id === id ? editItem : i)));
      }
      setEditItem(null);
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  const statusLabels = {
    current: "Тековен",
    future: "Идни",
    past: "Минат",
  };

  return (
    <div className="admin-panel" id="admin">
      <h2>ADMIN ПАНЕЛ</h2>

      <div className="admin-tabs">
        {["events", "artists", "messages"].map((t) => (
          <button
            key={t}
            className={`admin-tab${tab === t ? " active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "events"
              ? "Настани"
              : t === "artists"
                ? "Уметници"
                : "Пораки"}
          </button>
        ))}
      </div>

      {/* ── EVENTS TAB ──────────────────────────────── */}
      {tab === "events" && (
        <>
          <div className="admin-form">
            <h3>Додај настан</h3>
            <div className="admin-form-row">
              <div className="form-group">
                <label>Наслов</label>
                <input
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent((f) => ({ ...f, title: e.target.value }))
                  }
                />
              </div>
              <div className="form-group">
                <label>Датум</label>
                <input
                  value={newEvent.date}
                  onChange={(e) =>
                    setNewEvent((f) => ({ ...f, date: e.target.value }))
                  }
                />
              </div>
              <div className="form-group">
                <label>Статус</label>
                <select
                  value={newEvent.status}
                  onChange={(e) =>
                    setNewEvent((f) => ({ ...f, status: e.target.value }))
                  }
                >
                  <option value="current">Тековен (Почетна страна)</option>
                  <option value="future">Иден (Страна за настани)</option>
                  <option value="past">Минат (Страна за настани)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Опис</label>
              <textarea
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent((f) => ({ ...f, description: e.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label>URL на слика</label>
              <input
                value={newEvent.imageUrl}
                onChange={(e) =>
                  setNewEvent((f) => ({ ...f, imageUrl: e.target.value }))
                }
              />
            </div>
            <button className="btn btn-cream" onClick={addEvent}>
              + Додај настан
            </button>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Наслов</th>
                <th>Датум</th>
                <th>Статус</th>
                <th>Опис</th>
                <th>Акции</th>
              </tr>
            </thead>
            <tbody>
              {(events || []).map((ev) => (
                <tr key={ev.id}>
                  <td className="fw-bold">{ev.title}</td>
                  <td className="muted">{ev.date}</td>
                  <td className="muted truncate">{statusLabels[ev.status] || ev.status}</td>
                  <td className="muted truncate">{ev.description}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        setEditItem({ ...ev, _collection: "events" })
                      }
                    >
                      Уреди
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteItem("events", ev.id, setEvents)}
                    >
                      Избриши
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ── ARTISTS TAB ─────────────────────────────── */}
      {tab === "artists" && (
        <>
          <div className="admin-form">
            <h3>Додај уметник</h3>
            <div className="admin-form-row">
              <div className="form-group">
                <label>Ime</label>
                <input
                  value={newArtist.name}
                  onChange={(e) =>
                    setNewArtist((f) => ({ ...f, name: e.target.value }))
                  }
                />
              </div>
              <div className="form-group">
                <label>URL на слика</label>
                <input
                  value={newArtist.imageUrl}
                  onChange={(e) =>
                    setNewArtist((f) => ({ ...f, imageUrl: e.target.value }))
                  }
                />
              </div>
            </div>
            <button className="btn btn-cream" onClick={addArtist}>
              + Додај уметник
            </button>
          </div>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Ime</th>
                <th>Слика URL</th>
                <th>Акции</th>
              </tr>
            </thead>
            <tbody>
              {(artists || []).map((a) => (
                <tr key={a.id}>
                  <td className="fw-bold">{a.name}</td>
                  <td className="muted truncate">{a.imageUrl}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        setEditItem({ ...a, _collection: "artists" })
                      }
                    >
                      Уреди
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteItem("artists", a.id, setArtists)}
                    >
                      Избриши
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ── MESSAGES TAB ────────────────────────────── */}
      {tab === "messages" &&
        (msgLoading ? (
          <div className="loading">
            <div className="spinner" />
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Ime</th>
                <th>Е-пошта</th>
                <th>Порака</th>
                <th>Дата</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id}>
                  <td className="fw-bold">{m.name}</td>
                  <td className="muted">{m.email}</td>
                  <td className="muted truncate">{m.message}</td>
                  <td className="small-text">
                    {m.createdAt?.toDate?.()?.toLocaleDateString?.() || "—"}
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td colSpan={4} className="empty-state">
                    Нема пораки
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ))}

      {/* ── EDIT MODAL ──────────────────────────────── */}
      {editItem && (
        <div className="modal-overlay" onClick={() => setEditItem(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setEditItem(null)}>
              ✕
            </button>
            <h2 style={{ marginBottom: "1.5rem" }}>Уреди</h2>
            {editItem._collection === "events" ? (
              <>
                <div className="form-group">
                  <label>Наслов</label>
                  <input
                    value={editItem.title || ""}
                    onChange={(e) =>
                      setEditItem((f) => ({ ...f, title: e.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Датум</label>
                  <input
                    value={editItem.date || ""}
                    onChange={(e) =>
                      setEditItem((f) => ({ ...f, date: e.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Статус</label>
                  <select
                    value={editItem.status || "current"}
                    onChange={(e) =>
                      setEditItem((f) => ({ ...f, status: e.target.value }))
                    }
                  >
                    <option value="current">Тековен (Почетна страна)</option>
                    <option value="future">Иден (Страна за настани)</option>
                    <option value="past">Минат (Страна за настани)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Опис</label>
                  <textarea
                    value={editItem.description || ""}
                    onChange={(e) =>
                      setEditItem((f) => ({
                        ...f,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>URL на слика</label>
                  <input
                    value={editItem.imageUrl || ""}
                    onChange={(e) =>
                      setEditItem((f) => ({ ...f, imageUrl: e.target.value }))
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Ime</label>
                  <input
                    value={editItem.name || ""}
                    onChange={(e) =>
                      setEditItem((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="form-group">
                  <label>URL на слика</label>
                  <input
                    value={editItem.imageUrl || ""}
                    onChange={(e) =>
                      setEditItem((f) => ({ ...f, imageUrl: e.target.value }))
                    }
                  />
                </div>
              </>
            )}
            <button
              className="btn btn-cream"
              onClick={saveEdit}
              style={{ width: "100%", justifyContent: "center" }}
            >
              Зачувај
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

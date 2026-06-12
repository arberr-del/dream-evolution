import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import "./ApplySection.css";

export default function ApplySection({ user }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("empty");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "applications"), {
        ...form,
        userId: user?.uid || null,
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
    <section id="apply">
      <div className="apply-left">
        <h2 className="apply-title">ПРИЈАВИ СЕ НА АРТ СИТИ 2026</h2>
        <p>
          Пријави се на најголемиот отворен уметнички настан во Македонија како
          уметник или ентузијаст на уметноста.
        </p>
      </div>

      <div className="apply-right">
        <form onSubmit={handleSubmit}>
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
            <label>Порака / Опис</label>
            <textarea
              name="message"
              placeholder="Кажете ни повеќе за себе..."
              value={form.message}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-cream"
            disabled={loading}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {loading ? "Се испраќа..." : "Испрати пријава"}
          </button>
          {status === "success" && (
            <div className="success-msg">
              ✓ Вашата пријава е успешно испратена!
            </div>
          )}
          {status === "error" && (
            <div className="error-msg">✗ Грешка. Обидете се повторно.</div>
          )}
          {status === "empty" && (
            <div className="error-msg">
              ✗ Ве молиме пополнете ги сите полиња.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

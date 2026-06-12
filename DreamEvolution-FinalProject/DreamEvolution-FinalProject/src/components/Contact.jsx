import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
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
      await addDoc(collection(db, "messages"), {
        ...form,
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
    <section id="contact">
      <h2 className="section-title" style={{ color: "var(--white)" }}>
        КОНТАКТ
      </h2>
      <div className="contact-grid">
        <div className="contact-info">
          <p>
            Сакате да дознаете повеќе за нашите активности? Контактирајте не!
          </p>
          <div className="contact-phone">+389 70 123 456</div>
          <p className="contact-email">info@artcity.mk</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ime</label>
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
              placeholder="Вашата порака..."
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
            {loading ? "Се испраќа..." : "Испрати"}
          </button>
          {status === "success" && (
            <div className="success-msg">✓ Пораката е испратена!</div>
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

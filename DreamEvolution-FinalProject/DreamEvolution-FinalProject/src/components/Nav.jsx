import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Nav.css";
import { scrollToSection } from "../App";
import { handleNavigateToSection } from "../hooks/navigation";

export default function Nav({ user, onLogin, onLogout, isAdmin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeSection = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    handleNavigateToSection(navigate, location, id);
  };

  const sectionLinks = [
    { id: "events", label: "Настани" },
    { id: "artists", label: "Уметници" },
    { id: "apply", label: "Пријави се" },
    { id: "contact", label: "Контакт" },
    ...(isAdmin ? [{ id: "admin", label: "Админ" }] : []),
  ];

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo">
          ЕВОЛУЦИЈА НА СОНОТ
        </Link>

        {/* Desktop links */}
        <ul className="nav-links">
          {sectionLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={(e) => handleHomeSection(e, l.id)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/za-nas">За Нас</Link>
          </li>
        </ul>

        <div className="nav-right">
          {user ? (
            <>
              <span className="nav-user">{user.email}</span>
              <button className="btn btn-outline" onClick={onLogout}>
                Одјави се
              </button>
            </>
          ) : (
            <button className="btn btn-dark" onClick={onLogin}>
              Најави се
            </button>
          )}
          {/* Hamburger — mobile only */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`ham-line${menuOpen ? " open" : ""}`} />
            <span className={`ham-line${menuOpen ? " open" : ""}`} />
            <span className={`ham-line${menuOpen ? " open" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${menuOpen ? " mobile-drawer--open" : ""}`}>
        <ul className="mobile-nav-links">
          {sectionLinks.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={(e) => handleHomeSection(e, l.id)}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/za-nas" onClick={() => setMenuOpen(false)}>
              За Нас
            </Link>
          </li>
        </ul>
        <div className="mobile-nav-auth">
          {user && (
            <div className="mobile-user-email">{user.email}</div>
          )}
          {user ? (
            <button
              className="btn btn-outline"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                onLogout();
                setMenuOpen(false);
              }}
            >
              Одјави се
            </button>
          ) : (
            <button
              className="btn btn-dark"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => {
                onLogin();
                setMenuOpen(false);
              }}
            >
              Најави се
            </button>
          )}
        </div>
      </div>
    </>
  );
}

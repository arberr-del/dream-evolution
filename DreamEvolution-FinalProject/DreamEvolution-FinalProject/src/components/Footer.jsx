import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Footer.css";
import { handleNavigateToSection } from "../hooks/navigation";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e, id) => {
    e.preventDefault();
    handleNavigateToSection(navigate, location, id);
  };

  return (
    <footer>
      <div className="footer-logo">ЕВОЛУЦИЈА НА СОНОТ</div>

      <ul className="footer-links">
        <li>
          <a href="#events" onClick={(e) => handleClick(e, "events")}>
            Настани
          </a>
        </li>

        <li>
          <a href="#artists" onClick={(e) => handleClick(e, "artists")}>
            Уметници
          </a>
        </li>

        <li>
          <Link to="/za-nas">За Нас</Link>
        </li>

        <li>
          <a href="#contact" onClick={(e) => handleClick(e, "contact")}>
            Контакт
          </a>
        </li>
      </ul>

      <p className="footer-copy">© 2026 Еволуција на Сонот. Сите права задржани.</p>
    </footer>
  );
}

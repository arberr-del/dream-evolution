import "./Hero.css";
import { scrollToSection } from "../App";
import { useNavigate } from "react-router-dom";
import art1 from "../images/Art_1.png";
import art2 from "../images/Art_2.jpg";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <section id="hero">
        <div className="hero-left">
          <h1 className="hero-title">СПОЈ НА УМЕТНОСТА И ЗАЕДНИЦАТА</h1>
          <p className="hero-desc">
            Платформа на уметници за уметници. Пронајди настани, поврзи се со
            уметници и биди дел од нашата приказна.
          </p>
          <div className="hero-btns">
            <button
              className="btn btn-dark"
              onClick={() => scrollToSection("events")}
            >
              Погледни настани
            </button>
            <button
              className="btn btn-outline"
              onClick={() => scrollToSection("apply")}
            >
              Пријави се
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-image-collage">
            <div className="hero-img-cell flipped">
             <img src={art1} alt="Art 1" />
            </div>
            <div className="hero-img-cell">
              <img src={art2} alt="Art 2" />
            </div>
          </div>
          <div className="hero-overlay">
            <p>
              „Еволуција на сонот“ е уметничка платформа која го трансформира
              јавниот простор во жив културен екосистем, поврзувајќи уметници,
              градови и заедници. Преку уметност, таа создава основа за одржлив
              културен и општествен развој во Македонија.
            </p>
            <button className="quote-link" onClick={() => navigate("/za-nas")}>
              Прочитај повеќе →
            </button>
          </div>
        </div>
      </section>

      <div className="quote-bar">
        <p>
          Пријави се на најголемиот отворен уметнички настан во Македонија како
          уметник или ентузијаст на уметноста.
        </p>
        <p>
          Пополни ја формата и испрати ни ја. Ние ќе те контактираме и ќе ти
          дадеме повеќе информации.
        </p>
      </div>
    </>
  );
}

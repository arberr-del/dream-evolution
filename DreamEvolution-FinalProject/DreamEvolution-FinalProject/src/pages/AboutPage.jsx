import { useEffect } from "react";
import "./AboutPage.css";
import aboutHero from "../images/Еволуција на сонот_1.png";

// Dandelion SVG — matches the decorative illustration in the Figma
function Dandelion({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stem */}
      <line
        x1="100"
        y1="280"
        x2="100"
        y2="120"
        stroke="#333"
        strokeWidth="1.5"
      />
      {/* Rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
        (angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = 100 + Math.cos(rad) * 70;
          const y2 = 100 + Math.sin(rad) * 70;
          return (
            <line
              key={i}
              x1="100"
              y1="100"
              x2={x2}
              y2={y2}
              stroke="#333"
              strokeWidth="1"
            />
          );
        },
      )}
      {/* Seed dots */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
        (angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + Math.cos(rad) * 72;
          const y = 100 + Math.sin(rad) * 72;
          return <circle key={i} cx={x} cy={y} r="3" fill="#333" />;
        },
      )}
    </svg>
  );
}

export default function AboutPage() {
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="about-page">
      {/* ── HERO IMAGE + TITLE ─────────────────────── */}
      <section className="about-hero">
        <h1 className="about-hero-title">За Нас</h1>
        <div className="about-hero-img-wrap">
          <div className="about-hero-img">
            <img src={aboutHero} alt="За Нас" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* ── SECTION 01 — Кога улиците ──────────────── */}
      <section className="about-section about-section--01">
        <div className="about-section-text">
          <div className="about-section-number">01</div>
          <h2 className="about-section-heading">
            Кога улиците почнуваат да сонуваат
          </h2>
          <div className="about-divider" />
          <div className="about-section-body about-section-body--centered">
            <p>
              „Еволуција на сонот 4“ е уметничко движење што го доживува градот
              како жив организам — простор што дише, памети и сонува. Ние ја
              внесуваме уметноста таму каде што животот се случува секојдневно:
              на улиците, фасадите и патеките по кои се движат луѓето. Градот
              станува платно, а уметноста — јазик што ги поврзува заедницата,
              културата и времето во кое живееме.
            </p>
            <p>
              Преку мурали, колективно создавање и меѓународни соработки, се
              гради културна маршрута што се открива чекор по чекор. Процесот е
              жив, отворен и документиран — месец исполнет со создавање, дијалог
              и размена на идеи, што кулминира со заедничко славење на уметноста
              во јавниот простор.
            </p>
            <p>
              Ова е почеток на визијата за Градот на Уметноста (Арт Сити) —
              место каде што културата не е настан, туку состојба; каде што
              уметноста не се набљудува од дистанца, туку се живее. „Еволуција
              на сонот 4“ е повик да се замисли градот поинаку — како сон што
              расте со секој нов траг од боја.
            </p>
          </div>
        </div>
        <Dandelion className="about-dandelion about-dandelion--right" />
      </section>

      {/* ── SECTION 02 — Нашата приказна ──────────── */}
      <section className="about-section about-section--02">
        <Dandelion className="about-dandelion about-dandelion--left" />
        <div className="about-section-text about-section-text--right">
          <div className="about-section-number">02</div>
          <h2 className="about-section-heading">Нашата приказна</h2>
          <div className="about-divider" />
          <div className="about-section-body about-section-body--centered">
            <p>
              Фестивалот има корени од 2016 година, кога старата куќа на
              Рузвелтова 44а беше претворена во уметнички простор пред нејзиното
              рушење. Деветте соби на дебармаалската куќа беа насликани со
              мурали од реномирани уметници, придружени со концерти и
              перформанси, оставајќи магично искуство за посетителите.
            </p>
            <p>
              Подоцна, проектот продолжи во Кинотеката на Македонија со
              музичко-визуелни настапи и изложби. Ова е негово трето издание, но
              прво во форма на урбан фестивал што ќе продолжи да расте и да се
              надградува во наредните години.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

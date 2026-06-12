import ImageWithFallback from "./ImageWithFallback";
import "./Artists.css";
import { getImageSrc } from "../utils/getImageSrc";

export default function Artists({ artists, loading }) {
  return (
    <section id="artists">
      <h2 className="section-title">УМЕТНИЦИ</h2>
      <p className="artists-note">
        Страни за уметни лица: подготвени биле клуч-вредни за искажување на
        единствен и уникатен пристап кон уметноста.
      </p>

      {loading ? (
        <div className="loading">
          <div
            className="spinner"
            style={{ borderColor: "#ccc", borderTopColor: "#111" }}
          />
        </div>
      ) : (
        <div className="artists-carousel">
          {(artists || []).map((a) => (
            <div key={a.id} className="artist-card">
              <div className="artist-card-img-wrap">
                <ImageWithFallback src={getImageSrc(a.imageUrl)} alt={a.name} />
              </div>
              <div className="artist-card-name">{a.name}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

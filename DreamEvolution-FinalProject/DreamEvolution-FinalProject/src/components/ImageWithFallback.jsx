import { useState } from "react";

export default function ImageWithFallback({ src, alt, className, style }) {
  const [err, setErr] = useState(false);

  if (!src || err) {
    return (
      <div className="img-placeholder" style={style}>
        {alt || "Image"}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setErr(true)}
    />
  );
}

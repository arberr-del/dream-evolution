import imageMap from "./imageMap";

export const getImageSrc = (imageUrl) => {
  if (!imageUrl) return null;

  if (imageUrl.startsWith("http")) return imageUrl;

  return imageMap[imageUrl] || null;
};
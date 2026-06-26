const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export const getMapPreview = (lat: number, long: number) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${long}&key=${API_KEY}`;
};

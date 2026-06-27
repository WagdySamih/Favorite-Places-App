const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export const getMapPreview = (lat: number, long: number) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${long}&key=${API_KEY}`;
};

export const getAddress = async (lat: number, lng: number) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to get address");
    }
    const data = await res.json();

    const address = data.results[0]?.formatted_address;

    return address;
  } catch (error) {
    console.log(error);
    return "";
  }
};

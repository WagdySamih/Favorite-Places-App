import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabaseSync("places.db");

export const init = async (): Promise<void> => {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      imageUri TEXT NOT NULL,
      address TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL
    )
  `);
};

export const insertPlace = async (
  title: string,
  imageUri: string,
  address: string,
  lat: number,
  lng: number,
): Promise<number> => {
  const result = await database.runAsync(
    `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
    [title, imageUri, address, lat, lng],
  );

  return result.lastInsertRowId;
};

export const fetchPlaces = async () => {
  return await database.getAllAsync<{
    id: number;
    title: string;
    imageUri: string;
    address: string;
    lat: number;
    lng: number;
  }>(`SELECT * FROM places`);
};

export const fetchPlaceById = async (id: number) => {
  return await database.getFirstAsync<{
    id: number;
    title: string;
    imageUri: string;
    address: string;
    lat: number;
    lng: number;
  }>(`SELECT * FROM places WHERE id = ?`, [id]);
};

export const deletePlaceById = async (id: number): Promise<void> => {
  await database.runAsync(`DELETE FROM places WHERE id = ?`, [id]);
};

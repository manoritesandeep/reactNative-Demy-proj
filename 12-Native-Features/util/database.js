/** EXPO-SQLITE - ~15.1.2 */
import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabaseSync("places.db");

export function init() {
  return database.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )
    `);
}

export function insertPlace(place) {
  return database.runAsync(
    `
        INSERT INTO places (title, imageUri, address, lat, lng)
        VALUES (?, ?, ?, ?, ?)
        `,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ]
  );
}

export async function fetchPlaces() {
  const result = await database.getAllAsync("SELECT * FROM places");

  const places = [];

  for (const dp of result) {
    places.push(
      new Place(
        dp.title,
        dp.imageUri,
        {
          address: dp.address,
          lat: dp.lat,
          lng: dp.lng,
        },
        dp.id
      )
    );
  }

  return places;
}

// Old code - npm install expo-sqlite@10.1.0
// import * as SQLite from "expo-sqlite";

// // // create database if not exists but if does, open db...
// // // Note: There is a new version for expo-sqlite that does not support openDatabase rather new...
// const database = SQLite.openDatabase("places.db");

// // // Initialize the database
// export function init() {
//   const promise = new Promise((resolve, reject) => {
//     database.transaction((tx) => {
//       tx.executeSql(
//         `CREATE TABLE IF NOT EXISTS places (
//                 id INTEGER PRIMARY KEY NOT NULL,
//                 title TEXT NOT NULL,
//                 imageUri TEXT NOT NULL,
//                 address TEXT NOT NULL,
//                 lat REAL NOT NULL,
//                 lng REAL NOT NULL
//             )`,
//         [],
//         () => {
//           resolve();
//         },
//         (_, error) => {
//           reject(error);
//         }
//       );
//     });
//   });
//   return promise;
// }

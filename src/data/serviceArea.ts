/**
 * Downtown Toronto only: roughly Bathurst to the Don River, Bloor to the lake.
 * Add or remove postal prefixes (the first three characters) to change it.
 */
export const serviceArea = {
  name: "downtown Toronto",
  prefixes: {
    M4X: "Cabbagetown and St. James Town",
    M4Y: "Church-Wellesley",
    M5A: "Corktown, Regent Park and the Distillery",
    M5B: "Garden District",
    M5C: "St. Lawrence",
    M5E: "St. Lawrence and the Esplanade",
    M5G: "Bay Street Corridor",
    M5H: "Financial District",
    M5J: "Harbourfront and South Core",
    M5K: "TD Centre",
    M5L: "Commerce Court",
    M5S: "U of T and Harbord Village",
    M5T: "Kensington Market and Chinatown",
    M5V: "King West, CityPlace and the Entertainment District",
    M5X: "First Canadian Place",
    M7A: "Queen's Park",
  } as Record<string, string>,
  neighbourhoods: ["King West", "CityPlace", "Entertainment District", "Financial District", "Harbourfront", "St. Lawrence", "Corktown", "Distillery", "Cabbagetown", "Church-Wellesley", "Kensington Market", "Chinatown"],
  taxRate: 0.13,
  taxLabel: "HST (13%)",
};

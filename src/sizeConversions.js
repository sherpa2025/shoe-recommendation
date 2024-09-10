const sizeData = [
  { uk: "1", usm: "2", usw: "3", eu: "33.0", cm: "20.2" },
  { uk: "1 ½", usm: "2 ½", usw: "3 ½", eu: "33.6", cm: "20.6" },
  { uk: "2", usm: "3", usw: "4", eu: "34.3", cm: "21.0" },
  { uk: "2 ½", usm: "3 ½", usw: "4 ½", eu: "34.9", cm: "21.4" },
  { uk: "3", usm: "4", usw: "5", eu: "35.6", cm: "21.8" },
  { uk: "3 ½", usm: "4 ½", usw: "5 ½", eu: "36.2", cm: "22.3" },
  { uk: "4", usm: "5", usw: "6", eu: "36.8", cm: "22.7" },
  { uk: "4 ½", usm: "5 ½", usw: "6 ½", eu: "37.5", cm: "23.1" },
  { uk: "5", usm: "6", usw: "7", eu: "38.1", cm: "23.5" },
  { uk: "5 ½", usm: "6 ½", usw: "7 ½", eu: "38.8", cm: "24.0" },
  { uk: "6", usm: "7", usw: "8", eu: "39.4", cm: "24.4" },
  { uk: "6 ½", usm: "7 ½", usw: "8 ½", eu: "40.0", cm: "24.8" },
  { uk: "7", usm: "8", usw: "9", eu: "40.7", cm: "25.2" },
  { uk: "7 ½", usm: "8 ½", usw: "9 ½", eu: "41.4", cm: "25.6" },
  { uk: "8", usm: "9", usw: "10", eu: "42.0", cm: "26.1" },
  { uk: "8 ½", usm: "9 ½", usw: "10 ½", eu: "42.6", cm: "26.5" },
  { uk: "9", usm: "10", usw: "11", eu: "43.2", cm: "26.9" },
  { uk: "9 ½", usm: "10 ½", usw: "11 ½", eu: "43.9", cm: "27.3" },
  { uk: "10", usm: "11", usw: "12", eu: "44.5", cm: "27.8" },
  { uk: "10 ½", usm: "11 ½", usw: "12 ½", eu: "45.2", cm: "28.2" },
  { uk: "11", usm: "12", usw: "13", eu: "45.8", cm: "28.6" },
  { uk: "11 ½", usm: "12 ½", usw: "13 ½", eu: "46.4", cm: "29.0" },
  { uk: "12", usm: "13", usw: "14", eu: "47.1", cm: "29.5" },
  { uk: "12 ½", usm: "13 ½", usw: "14 ½", eu: "47.7", cm: "29.9" },
  { uk: "13", usm: "14", usw: "", eu: "48.4", cm: "30.3" },
  { uk: "13 ½", usm: "14 ½", usw: "", eu: "49.0", cm: "30.7" },
  { uk: "14", usm: "15", usw: "", eu: "49.6", cm: "31.1" },
];

// Helper function to create size equivalents or "N/A"
const createSizeEquivalent = (sizeEntry) => {
  if (sizeEntry) {
    return {
      UK: sizeEntry.uk,
      USM: sizeEntry.usm,
      USW: sizeEntry.usw,
      EU: sizeEntry.eu,
      CM: sizeEntry.cm,
    };
  }

  return {
    UK: "N/A",
    USM: "N/A",
    USW: "N/A",
    EU: "N/A",
    CM: "N/A",
  };
};

// Function to find the equivalent sizes based on a given size and type
export const getEquivalentSizes = (size, type) => {
  const sizeEntry = sizeData.find(
    (entry) => entry[type.toLowerCase()] === size
  );

  return createSizeEquivalent(sizeEntry);
};

// Function to find the equivalent sizes based on a UK size
export const getFinalSizes = (ukSize) => {
  const sizeEntry = sizeData.find((entry) => entry.uk === ukSize);

  return createSizeEquivalent(sizeEntry);
};

// street model
// {
//   "beginners": {
//     "oasi": "0",
//     "oasi lv": "0",
//     "iati": "0",
//     "tarifa": "0",
//     "mundaka": "0",
//     "indalo": "0",
//     "mastia": "-0.5",
//     "ra": "0.5",
//     "ra woman": "0.5",
//     "inti": "0.5",
//     "masai": "0.5",
//     "tanta": "0.5"
//   },
//   "prolonged use": {
//     "oasi": "-0.5",
//     "oasi lv": "-0.5",
//     "iati": "-0.5",
//     "tarifa": "-0.5",
//     "mundaka": "-0.5",
//     "indalo": "-0.5",
//     "mastia": "-1",
//     "ra": "0",
//     "ra woman": "0",
//     "inti": "0",
//     "masai": "0",
//     "tanta": "0"
//   },
//   "comfort fit": {
//     "oasi": "-1",
//     "oasi lv": "-1",
//     "iati": "-1",
//     "tarifa": "-1",
//     "mundaka": "-1",
//     "indalo": "-1",
//     "mastia": "-1.5",
//     "ra": "-0.5",
//     "ra woman": "-0.5",
//     "inti": "-0.5",
//     "masai": "-0.5",
//     "tanta": "-0.5"
//   },
//   "tighter fit": {
//     "oasi": "-1.5",
//     "oasi lv": "-1.5",
//     "iati": "-1.5",
//     "tarifa": "-1.5",
//     "mundaka": "-1.5",
//     "indalo": "-1.5",
//     "mastia": "-2",
//     "ra": "-1",
//     "ra woman": "-1",
//     "inti": "-1",
//     "masai": "-1",
//     "tanta": "-1"
//   }
// }

function parseSize(size) {
  if (size.includes("½")) {
    const wholePart = parseFloat(size.split(" ")[0]);
    return wholePart + 0.5;
  }
  // If there is no fractional part, just convert to float
  return parseFloat(size);
}

const getRecommendation = (userUkSize, adjustmentData, chosenBrand) => {
  // Normalize UK size
  const normalizedUkSize = parseSize(userUkSize);

  // Get the adjustment value for the recommended model based on the previous brand
  const adjustment = adjustmentData[chosenBrand.toLowerCase()] || "0";

  // Convert the adjustment to a number
  const adjustmentValue = parseFloat(adjustment);

  // Apply the adjustment to the normalized UK size
  const finalSize = normalizedUkSize + adjustmentValue;

  // Format the final size
  const formattedSize = Number.isInteger(finalSize)
    ? finalSize.toString() // If whole number, return it as string
    : `${Math.floor(finalSize)} ½`; // If not, return as mixed fraction

  return {
    recommendedSize: formattedSize,
  };
};

// Recommendation data based on previous climbing shoe
const recommendationData = {
  sportiva: {
    oasi: "0",
    "oasi lv": "0",
    iati: "0",
    mundaka: "0",
    mastia: "-0.5",
    tarifa: "0",
    indalo: "0",
    ra: "0.5",
    "ra woman": "0.5",
    inti: "0.5",
    masai: "0.5",
    tanta: "0",
  },
  scarpa: {
    oasi: "-1",
    "oasi lv": "-1",
    iati: "-1",
    mundaka: "-1",
    mastia: "-1.5",
    tarifa: "-1",
    indalo: "-1",
    ra: "-0.5",
    "ra woman": "-0.5",
    inti: "-0.5",
    masai: "-0.5",
    tanta: "-1",
  },
  tenaya: {
    oasi: "0",
    "oasi lv": "0",
    iati: "0",
    mundaka: "0",
    mastia: "-0.5",
    tarifa: "0",
    indalo: "-0.5",
    ra: "0.5",
    "ra woman": "0.5",
    inti: "0.5",
    masai: "0.5",
    tanta: "0",
  },
};

// Street recommendation data
const streetRecommendationData = {
  beginners: {
    oasi: "0",
    "oasi lv": "0",
    iati: "0",
    tarifa: "0",
    mundaka: "0",
    indalo: "0",
    mastia: "-0.5",
    ra: "0.5",
    "ra woman": "0.5",
    inti: "0.5",
    masai: "0.5",
    tanta: "0.5",
  },
  "prolonged use": {
    oasi: "-0.5",
    "oasi lv": "-0.5",
    iati: "-0.5",
    tarifa: "-0.5",
    mundaka: "-0.5",
    indalo: "-0.5",
    mastia: "-1",
    ra: "0",
    "ra woman": "0",
    inti: "0",
    masai: "0",
    tanta: "0",
  },
  "comfort fit": {
    oasi: "-1",
    "oasi lv": "-1",
    iati: "-1",
    tarifa: "-1",
    mundaka: "-1",
    indalo: "-1",
    mastia: "-1.5",
    ra: "-0.5",
    "ra woman": "-0.5",
    inti: "-0.5",
    masai: "-0.5",
    tanta: "-0.5",
  },
  "tighter fit": {
    oasi: "-1.5",
    "oasi lv": "-1.5",
    iati: "-1.5",
    tarifa: "-1.5",
    mundaka: "-1.5",
    indalo: "-1.5",
    mastia: "-2",
    ra: "-1",
    "ra woman": "-1",
    inti: "-1",
    masai: "-1",
    tanta: "-1",
  },
};

// Exported functions to get recommendations
export const getShoeRecommendation = (
  previousBrand,
  userUkSize,
  recommendedModel
) => {
  return getRecommendation(
    userUkSize,
    recommendationData[previousBrand.toLowerCase()] || {},
    recommendedModel
  );
};

export const getStreetRecommendation = (
  userChoosenBrand,
  userUkSize,
  comfortOption
) => {
  return getRecommendation(
    userUkSize,
    streetRecommendationData[comfortOption.toLowerCase()] || {},
    userChoosenBrand
  );
};

function parseSize(size) {
  if (size.includes("½")) {
    const wholePart = parseFloat(size.split(" ")[0]);
    return wholePart + 0.5;
  }

  // If there is no fractional part, just convert to float
  return parseFloat(size);
}

export const getRecommendation = (
  previousBrand,
  userUkSize,
  recommendedModel
) => {
  // Normalize UK size
  const normalizedUkSize = parseSize(userUkSize);

  // Get the adjustment value for the recommended model based on the previous brand
  const adjustment =
    recommendationData[previousBrand.toLowerCase()]?.[
      recommendedModel.toLowerCase()
    ] || "0";

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

// Recommendation data basedoon previous climbing shoe
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

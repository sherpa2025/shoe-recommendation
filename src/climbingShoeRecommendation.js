function parseSize(size) {
  // Replace the fractional part with its decimal equivalent
  if (size.includes("½")) {
    // Extract the whole number part and convert it to float
    const wholePart = parseFloat(size.split(" ")[0]);
    // Add 0.5 to the whole number part
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
  console.log(`User UK Size: ${userUkSize}`);
  console.log(`Normalized UK Size: ${normalizedUkSize}`);
  console.log(`Previous Brand: ${previousBrand}`);
  console.log(`Tenaya chosen model: ${recommendedModel}`);

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

  // Print the final recommended size
  console.log(`Recommended Size in decimal: ${finalSize}`);
  console.log(`Recommended Size in string: ${formattedSize}`);

  return {
    recommendedSize: formattedSize,
  };
};

// Recommendation data
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

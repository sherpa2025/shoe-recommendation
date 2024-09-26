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
  previousBrandOrUserUkSize, // This can be previousBrand or userUkSize
  userUkSizeOrRecommendedModel, // This can be userUkSize or recommendedModel
  recommendedModelOrComfortOption // This can be recommendedModel or comfortOption
) => {
  let normalizedUkSize;
  let recommendedModel;
  let comfortOption;

  // Determine which parameters are being used
  if (isNaN(previousBrandOrUserUkSize)) {
    // If the first parameter is not a number, it means it's previousBrand
    const previousBrand = previousBrandOrUserUkSize;
    normalizedUkSize = parseSize(userUkSizeOrRecommendedModel);
    recommendedModel = userUkSizeOrRecommendedModel;

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
  } else {
    // If the first parameter is a number, it means it's userUkSize
    normalizedUkSize = parseSize(previousBrandOrUserUkSize);
    recommendedModel = userUkSizeOrRecommendedModel;
    comfortOption = recommendedModelOrComfortOption;

    comfortOption = recommendedModelOrComfortOption.toLowerCase();

    const adjustment =
      streetRecommendationData[comfortOption][recommendedModel.toLowerCase()] ||
      "0";

    const adjustmentValue = parseFloat(adjustment);

    const finalSize = normalizedUkSize + adjustmentValue;

    const formattedSize = Number.isInteger(finalSize)
      ? finalSize.toString()
      : `${Math.floor(finalSize)} ½`;

    return {
      recommendedSize: formattedSize,
    };
  }
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
  prolonged: {
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

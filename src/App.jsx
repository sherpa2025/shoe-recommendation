import { useState, useEffect } from "react";
import "./App.css";
import { brands, sizeTypes, comfortOptions, sizes } from "./shoeData";
import { getEquivalentSizes, getFinalSizes } from "./sizeConversions";
import {
  getShoeRecommendation,
  getStreetRecommendation,
} from "./shoeRecommendationLogic";

import tenayaLogo from "/assets/tenaya/tenaya-logo.png";

const App = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedTenayaModel, setSelectedTenayaModel] = useState(null);
  const [previousTenayaModel, setPreviousTenayaModel] = useState(null);
  const [selectedSizeType, setSelectedSizeType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [userUkSize, setUserUkSize] = useState(null);
  const [recommendedUkSize, setRecommendedUkSize] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [selectedComfortOption, setSelectedComfortOption] = useState(null);
  const [previousComfortOption, setPreviousComfortOption] = useState(null);

  const resetStates = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedTenayaModel(null);
    setSelectedSizeType(null);
    setSelectedSize(null);
    setRecommendedUkSize(null);
    setSelectedComfortOption(null);
    setPreviousTenayaModel(null);
    setPreviousComfortOption(null);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedSizeType(null);
    setSelectedSize(null);
    setSelectedTenayaModel(null);
    setPreviousTenayaModel(null);
  };

  const handleModelClick = (model) => {
    setSelectedModel(model);
    setSelectedSizeType(null);
    setSelectedSize(null);
    setSelectedTenayaModel(null);
    setPreviousTenayaModel(null);
  };

  const handleSizeTypeClick = (sizeType) => {
    setSelectedSizeType(sizeType);
    setSelectedSize(null);
    setSelectedTenayaModel(null);
    setPreviousTenayaModel(null);
    setSelectedComfortOption(null);
    setPreviousComfortOption(null);
  };

  const handleSizeClick = (size) => {
    const equivalents = getEquivalentSizes(size, selectedSizeType);
    setSelectedSize(size);
    setUserUkSize(equivalents.UK); // Store the UK size
    setSelectedTenayaModel(null);
    setPreviousTenayaModel(null);
    setSelectedComfortOption(null);
    setPreviousComfortOption(null);
  };

  const handleTenayaModelClick = (model) => {
    setSelectedTenayaModel(model);
    setRecommendedUkSize(null); // Clear previous parsed size
    setPreviousTenayaModel(null);
    setSelectedComfortOption(null);
  };

  // Use the UK size to get size equivalents for final recommendation shoe size
  const displayEquivalents = recommendedUkSize
    ? getFinalSizes(recommendedUkSize)
    : {};

  const handleClimbingSectionClick = () => {
    resetStates();
    setCurrentSection("climbing");
  };

  const handleStreetSectionClick = () => {
    resetStates();
    setCurrentSection("street");
  };

  const handleComfortOptionClick = (option) => {
    setSelectedComfortOption(option);
    setRecommendedUkSize(null);
    setPreviousComfortOption(null);
  };

  useEffect(() => {
    const fetchRecommendation = () => {
      if (
        (currentSection === "climbing" &&
          selectedTenayaModel &&
          userUkSize &&
          selectedBrand) ||
        (currentSection === "street" &&
          selectedTenayaModel &&
          userUkSize &&
          selectedComfortOption)
      ) {
        // Only fetch recommendation if the model or comfort option has changed
        if (
          (currentSection === "climbing" &&
            selectedTenayaModel !== previousTenayaModel) ||
          (currentSection === "street" &&
            selectedComfortOption !== previousComfortOption)
        ) {
          // Fetch recommendation based on section
          const recommendation =
            currentSection === "climbing"
              ? getShoeRecommendation(
                  selectedBrand,
                  userUkSize,
                  selectedTenayaModel
                )
              : getStreetRecommendation(
                  selectedTenayaModel,
                  userUkSize,
                  selectedComfortOption
                );

          // Update the recommendation size
          setRecommendedUkSize(recommendation.recommendedSize);

          // Update the previous values accordingly
          if (currentSection === "climbing") {
            setPreviousTenayaModel(selectedTenayaModel);
          } else if (currentSection === "street") {
            setPreviousComfortOption(selectedComfortOption);
          }
        }
      }
    };

    fetchRecommendation();
  }, [
    selectedTenayaModel,
    userUkSize,
    selectedBrand,
    selectedComfortOption,
    currentSection,
    previousTenayaModel,
    previousComfortOption,
  ]);

  const renderSizes = () => {
    if (selectedSizeType) {
      return (
        <div className="sizes">
          <select
            value={selectedSize || ""}
            onChange={(e) => handleSizeClick(e.target.value)}
            className={selectedSize ? "selected" : "unselected"}
          >
            <option value="" disabled>
              ---
            </option>
            {sizes[selectedSizeType]?.map((size) => (
              <option key={size} value={size}>
                <p>{size}</p>
              </option>
            ))}
          </select>
        </div>
      );
    }
    return null;
  };
  const allSelectionsMade =
    selectedBrand && selectedModel && selectedSizeType && selectedSize;

  return (
    <div className="app">
      <div className="navbar">
        <img src={tenayaLogo} alt="Tenaya Logo" className="navbar-image" />
      </div>
      <div className="navbar-prompt">
        <p>
          Follow these few simple steps to find the perfect fit for your Tenaya
          climbing shoes.
        </p>
      </div>
      <div className="border-line"></div>

      <section className="step-container">
        <p className="step-outer-prompt">Step 1</p>
        <p className="step-inner-prompt">
          Help us understand where to start. Will your fit be based on:
        </p>
        <div className="toggle-buttons">
          <button
            onClick={handleClimbingSectionClick}
            className={`${
              currentSection === "climbing"
                ? "selected"
                : currentSection !== null
                ? "unselected"
                : ""
            }`}
          >
            <p>PREVIOUS CLIMBING SHOE</p>
          </button>
          <button
            onClick={handleStreetSectionClick}
            className={`${
              currentSection === "street"
                ? "selected"
                : currentSection !== null
                ? "unselected"
                : ""
            }`}
          >
            <p>STREET SHOE SIZE</p>
          </button>
        </div>
      </section>

      {currentSection === "climbing" && (
        <div>
          <section className="step-container">
            <p className="step-outer-prompt">Step 2</p>
            <p className="step-inner-prompt">
              Select the brand of climbing you previously wore.
            </p>
            <div className="brand-options">
              {Object.keys(brands).map((brand) => (
                <button
                  key={brand}
                  className={`${
                    selectedBrand === brand
                      ? "selected"
                      : selectedBrand !== null
                      ? "unselected"
                      : ""
                  }`}
                  onClick={() => handleBrandClick(brand)}
                >
                  <img
                    src={brands[brand].logoImage}
                    alt={brand}
                    className="brand-logo"
                  />
                </button>
              ))}
            </div>
          </section>

          {selectedBrand && (
            <section className="step-container">
              <p className="step-outer-prompt">Step 3</p>
              <p className="step-inner-prompt">
                Please select the {selectedBrand} model you wore previously.
              </p>

              <div className="brand-model">
                {brands[selectedBrand].models.map((model) => (
                  <button
                    key={model.name}
                    className={`${
                      selectedModel === model.name
                        ? "selected"
                        : selectedModel !== null
                        ? "unselected"
                        : ""
                    }`}
                    onClick={() => handleModelClick(model.name)}
                  >
                    <img
                      src={model.image}
                      alt={model.name}
                      className="model-logo"
                    />
                    <p className="model-name">{model.name}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {selectedModel && (
            <section className="step-container">
              <p className="step-outer-prompt">Step 4</p>
              <p className="step-inner-prompt">
                Select your regional sizing preference.
              </p>
              <div className="size-type">
                {sizeTypes.map((sizeType) => (
                  <button
                    key={sizeType}
                    className={`${
                      selectedSizeType === sizeType
                        ? "selected"
                        : selectedSizeType !== null
                        ? "unselected"
                        : ""
                    }`}
                    onClick={() => handleSizeTypeClick(sizeType)}
                  >
                    <p>{sizeType}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {selectedSizeType && (
            <section className="step-container">
              <p className="step-outer-prompt">Step 5</p>
              <p className="step-inner-prompt">
                Select your size.
                {renderSizes()}
              </p>
            </section>
          )}

          {allSelectionsMade && (
            <section className="step-container">
              <p className="step-outer-prompt">Step 6</p>
              <p className="step-inner-prompt">
                Please select your desired Tenaya model.
              </p>
              <div className="brand-model">
                {brands.Tenaya.models.map((model) => (
                  <button
                    key={model.name}
                    className={`${
                      selectedTenayaModel === model.name
                        ? "selected"
                        : selectedTenayaModel !== null
                        ? "unselected"
                        : ""
                    }`}
                    onClick={() => handleTenayaModelClick(model.name)}
                  >
                    <img
                      src={model.image}
                      alt={model.name}
                      className="model-logo"
                    />
                    <p className="model-name">{model.name}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {selectedTenayaModel && (
            <section className="final-container">
              <p className="final-outer-prompt">
                HERE&apos;S OUR SIZING RECOMMENDATION.
              </p>
              <p className="final-inner-prompt">Previous climbing shoes:</p>
              <p
                className="step-inner-prompt"
                style={{ fontWeight: "bolder", fontSize: "18px" }}
              >
                {selectedBrand} {selectedModel} {selectedSizeType}{" "}
                {selectedSize}
              </p>
              <div className="final-border-line"></div>

              <p className="final-inner-prompt" style={{ fontSize: "18px" }}>
                Your recommended size for:{" "}
              </p>
              <p className="final-outer-prompt" style={{ marginTop: "15px" }}>
                TENAYA {selectedTenayaModel}
              </p>
              <div className="image-and-table">
                <img
                  src={
                    brands.Tenaya.models.find(
                      (model) => model.name === selectedTenayaModel
                    )?.image
                  }
                  alt={selectedTenayaModel}
                  className="model-image"
                />
                <div>
                  {Object.keys(displayEquivalents).length === 0 ||
                  Object.values(displayEquivalents).every(
                    (size) => !size || size === "N/A"
                  ) ? (
                    <p
                      className="final-inner-prompt"
                      style={{ fontWeight: "bolder", fontSize: "18px" }}
                    >
                      No shoe recommendation with this combination
                    </p>
                  ) : (
                    <table className="size-table">
                      <tbody>
                        {["UK", "USM", "USW", "EU", "CM"].map((type) => (
                          <tr key={type}>
                            <td>{type}</td>
                            <td>{displayEquivalents[type] || "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      )}
      {currentSection === "street" && (
        <div>
          <section className="step-container">
            <p className="step-outer-prompt">Step 2</p>
            <p className="step-inner-prompt">
              Select your regional sizing preference.
            </p>
            <div className="size-type">
              {sizeTypes.map((sizeType) => (
                <button
                  key={sizeType}
                  className={`${
                    selectedSizeType === sizeType
                      ? "selected"
                      : selectedSizeType !== null
                      ? "unselected"
                      : ""
                  }`}
                  onClick={() => handleSizeTypeClick(sizeType)}
                >
                  <p>{sizeType}</p>
                </button>
              ))}
            </div>
          </section>

          {selectedSizeType && (
            <section className="step-container">
              <p className="step-outer-prompt">Step 3</p>
              <p className="step-inner-prompt">
                Select your size.
                {renderSizes()}
              </p>
            </section>
          )}

          {selectedSize && (
            <section className="step-container">
              <p className="step-outer-prompt">Step 4</p>
              <p className="step-inner-prompt">
                Please select your desired Tenaya model.
              </p>
              <div className="brand-model">
                {brands.Tenaya.models.map((model) => (
                  <button
                    key={model.name}
                    className={`${
                      selectedTenayaModel === model.name
                        ? "selected"
                        : selectedTenayaModel !== null
                        ? "unselected"
                        : ""
                    }`}
                    onClick={() => handleTenayaModelClick(model.name)}
                  >
                    <img
                      src={model.image}
                      alt={model.name}
                      className="model-logo"
                    />
                    <p className="model-name">{model.name}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {selectedTenayaModel && (
            <section className="step-container">
              <p className="step-outer-prompt">Step 5</p>
              <p className="step-inner-prompt">
                Please select your comport/performance level.
              </p>
              <div className="comfort-options">
                {comfortOptions.map((option) => (
                  <button
                    key={option}
                    className={`${
                      selectedComfortOption === option ? "selected" : ""
                    }`}
                    onClick={() => handleComfortOptionClick(option)}
                  >
                    <p>{option}</p>
                  </button>
                ))}
              </div>
            </section>
          )}

          {selectedComfortOption && (
            <section className="final-container">
              <p className="final-outer-prompt">
                HERE&apos;S OUR SIZING RECOMMENDATION.
              </p>
              <p className="final-inner-prompt">
                Street shoe:{" "}
                <span style={{ fontSize: "18px", fontWeight: "bolder" }}>
                  {selectedSizeType} {selectedSize}
                </span>
              </p>

              <p className="step-inner-prompt">
                Comfort Option:{" "}
                <span style={{ fontSize: "18px", fontWeight: "bolder" }}>
                  {selectedComfortOption}
                </span>
              </p>
              <div className="final-border-line"></div>
              <p className="final-inner-prompt" style={{ fontSize: "18px" }}>
                Your recommended size for:{" "}
              </p>
              <p className="final-outer-prompt" style={{ marginTop: "15px" }}>
                TENAYA {selectedTenayaModel}
              </p>

              <div className="image-and-table">
                <img
                  src={
                    brands.Tenaya.models.find(
                      (model) => model.name === selectedTenayaModel
                    )?.image
                  }
                  alt={selectedTenayaModel}
                  className="model-image"
                />
                <div>
                  {Object.keys(displayEquivalents).length === 0 ||
                  Object.values(displayEquivalents).every(
                    (size) => !size || size === "N/A"
                  ) ? (
                    <p
                      className="final-inner-prompt"
                      style={{ fontWeight: "bolder", fontSize: "18px" }}
                    >
                      No shoe recommendation with this combination
                    </p>
                  ) : (
                    <table className="size-table">
                      <tbody>
                        {["UK", "USM", "USW", "EU", "CM"].map((type) => (
                          <tr key={type}>
                            <td>{type}</td>
                            <td>{displayEquivalents[type] || "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

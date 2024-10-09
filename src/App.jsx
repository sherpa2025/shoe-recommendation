import { useState, useEffect } from "react";
import "./App.css";
import { brands, sizeTypes, comfortOptions, sizes } from "./shoeData";
import { getEquivalentSizes, getFinalSizes } from "./sizeConversions";
import {
  getShoeRecommendation,
  getStreetRecommendation,
} from "./shoeRecommendationLogic";

const App = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedSizeType, setSelectedSizeType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [recommendedModel, setRecommendedModel] = useState(null);
  const [userUkSize, setUserUkSize] = useState(null);
  const [recommendedUkSize, setRecommendedUkSize] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [selectedComfortOption, setSelectedComfortOption] = useState(null);

  const resetStates = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedSizeType(null);
    setSelectedSize(null);
    setRecommendedModel(null);
    setRecommendedUkSize(null);
    setSelectedComfortOption(null);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedSizeType(null);
    setSelectedSize(null);
    setRecommendedModel(null);
  };

  const handleModelClick = (model) => {
    setSelectedModel(model);
    setSelectedSizeType(null);
    setSelectedSize(null);
    setRecommendedModel(null);
  };

  const handleSizeTypeClick = (sizeType) => {
    setSelectedSizeType(sizeType);
    setSelectedSize(null);
    setRecommendedModel(null); // Reset recommendation when size type changes
    setSelectedComfortOption(null);
  };

  const handleSizeClick = (size) => {
    const equivalents = getEquivalentSizes(size, selectedSizeType);
    setSelectedSize(size);
    setUserUkSize(equivalents.UK); // Store the UK size
    setRecommendedModel(null); // Reset recommendation when size changes
    setSelectedComfortOption(null);
  };

  const handleTenayaModelClick = (model) => {
    setRecommendedModel(model);
    setRecommendedUkSize(null); // Clear previous parsed size
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
  };

  useEffect(() => {
    const fetchRecommendation = () => {
      if (
        (currentSection === "climbing" &&
          recommendedModel &&
          userUkSize &&
          selectedBrand) ||
        (currentSection === "street" &&
          recommendedModel &&
          userUkSize &&
          selectedComfortOption)
      ) {
        const recommendation =
          currentSection === "climbing"
            ? getShoeRecommendation(selectedBrand, userUkSize, recommendedModel)
            : getStreetRecommendation(
                recommendedModel,
                userUkSize,
                selectedComfortOption
              );
        setRecommendedUkSize(recommendation.recommendedSize);
      }
    };

    fetchRecommendation();
  }, [
    recommendedModel,
    userUkSize,
    selectedBrand,
    selectedComfortOption,
    currentSection,
  ]);

  const renderSizes = () => {
    if (selectedSizeType) {
      return (
        <div className="sizes">
          {sizes[selectedSizeType]?.map((size) => (
            <button
              key={size}
              className={`size-option ${
                size === selectedSize ? "selected" : ""
              }`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };
  const allSelectionsMade =
    selectedBrand && selectedModel && selectedSizeType && selectedSize;

  return (
    <div className="app">
      <h4>
        Follow these 6 simple steps to find the perfect fit for your Tenaya
        climbing shoes
      </h4>

      {/* Toggle buttons */}
      <div className="toggle-buttons">
        <button onClick={handleClimbingSectionClick}>
          According to the previous used climbing shoe
        </button>
        <button onClick={handleStreetSectionClick}>
          According to street shoe
        </button>
      </div>

      {currentSection === "climbing" && (
        <div>
          <section className="section">
            <h3>Select brand of your previous model</h3>
            <div className="options">
              {Object.keys(brands).map((brand) => (
                <button
                  key={brand}
                  className={`option ${
                    selectedBrand === brand ? "selected" : ""
                  }`}
                  onClick={() => handleBrandClick(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </section>

          {selectedBrand && (
            <section className="section">
              <h3>Select your previous model of {selectedBrand}</h3>
              <div className="options">
                {brands[selectedBrand].map((model) => (
                  <button
                    key={model}
                    className={`option ${
                      selectedModel === model ? "selected" : ""
                    }`}
                    onClick={() => handleModelClick(model)}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </section>
          )}

          {selectedModel && (
            <section className="section">
              <h3>Select the size of your previous model</h3>
              <h3>Size type</h3>
              <div className="options">
                {sizeTypes.map((sizeType) => (
                  <button
                    key={sizeType}
                    className={`option ${
                      selectedSizeType === sizeType ? "selected" : ""
                    }`}
                    onClick={() => handleSizeTypeClick(sizeType)}
                  >
                    {sizeType}
                  </button>
                ))}
              </div>
            </section>
          )}

          {selectedSizeType && (
            <section className="section">
              <h3>Size</h3>
              {renderSizes()}
            </section>
          )}

          {allSelectionsMade && (
            <section className="section">
              <h3>Choose your Tenaya Model</h3>
              <div className="options">
                {brands.Tenaya.map((model) => (
                  <button
                    key={model}
                    className={`option ${
                      recommendedModel === model ? "selected" : ""
                    }`}
                    onClick={() => handleTenayaModelClick(model)}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </section>
          )}

          {recommendedModel && (
            <section className="section">
              <h3>Your recommended size: Tenaya {recommendedModel}</h3>
              <div
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  width: "calc(25% - 40px)",
                  height: "calc(25% - 40px)",
                  boxSizing: "border-box",
                }}
              >
                {Object.keys(displayEquivalents).length === 0 ||
                Object.values(displayEquivalents).every(
                  (size) => !size || size === "N/A"
                ) ? (
                  // If no valid sizes are found, show this message
                  <p>No shoe recommendation with this combination</p>
                ) : (
                  // Otherwise, display the equivalent sizes
                  ["UK", "USM", "USW", "EU", "CM"].map((type) => (
                    <p key={type}>
                      <span
                        style={{
                          textDecoration:
                            type === selectedSizeType ? "underline" : "none",
                        }}
                      >
                        {type}: {displayEquivalents[type] || "N/A"}
                      </span>
                    </p>
                  ))
                )}
              </div>

              <h4>
                Previous climbing shoes: {selectedBrand} {selectedModel}{" "}
                {selectedSizeType} {selectedSize}
                <br />
                New Tenaya climbing shoes: {recommendedModel}
              </h4>
            </section>
          )}
        </div>
      )}
      {currentSection === "street" && (
        <div>
          <section className="section">
            <h3>Select Size Type</h3>
            <div className="options">
              {sizeTypes.map((sizeType) => (
                <button
                  key={sizeType}
                  className={`option ${
                    selectedSizeType === sizeType ? "selected" : ""
                  }`}
                  onClick={() => handleSizeTypeClick(sizeType)}
                >
                  {sizeType}
                </button>
              ))}
            </div>
          </section>

          {selectedSizeType && (
            <section className="section">
              <h3>Size</h3>
              {renderSizes()}
            </section>
          )}

          {selectedSize && (
            <section className="section">
              <h3>Select Your Tenaya Model</h3>
              <div className="options">
                {brands.Tenaya.map((model) => (
                  <button
                    key={model}
                    className={`option ${
                      recommendedModel === model ? "selected" : ""
                    }`}
                    onClick={() => handleTenayaModelClick(model)}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </section>
          )}

          {recommendedModel && (
            <section className="section">
              <h3>Select Comfort Option</h3>
              <div className="options">
                {comfortOptions.map((option) => (
                  <button
                    key={option}
                    className={`option ${
                      selectedComfortOption === option ? "selected" : ""
                    }`}
                    onClick={() => handleComfortOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </section>
          )}

          {selectedComfortOption && (
            <section className="section">
              <h3>Your recommended size: Tenaya {recommendedModel}</h3>
              <div
                style={{
                  backgroundColor: "#333",
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px",
                  width: "calc(25% - 40px)",
                  height: "calc(25% - 40px)",
                  boxSizing: "border-box",
                }}
              >
                {Object.keys(displayEquivalents).length === 0 ||
                Object.values(displayEquivalents).every(
                  (size) => !size || size === "N/A"
                ) ? (
                  // If no valid sizes are found, show this message
                  <p>No shoe recommendation with this combination</p>
                ) : (
                  // Otherwise, display the equivalent sizes
                  ["UK", "USM", "USW", "EU", "CM"].map((type) => (
                    <p key={type}>
                      <span
                        style={{
                          textDecoration:
                            type === selectedSizeType ? "underline" : "none",
                        }}
                      >
                        {type}: {displayEquivalents[type] || "N/A"}
                      </span>
                    </p>
                  ))
                )}
              </div>

              <h4>
                Street shoe: {selectedSizeType} {selectedSize}
                <br />
                New Tenaya model: {recommendedModel}
                <br />
                Comfort Option: {selectedComfortOption}
              </h4>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default App;

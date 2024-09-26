import { useState, useEffect } from "react";
import "./App.css";
import { getEquivalentSizes, getFinalSizes } from "./sizeConversions";
import { getRecommendation } from "./climbingShoeRecommendation";

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

  const brands = {
    Sportiva: [
      "Solution",
      "Genius",
      "Futura",
      "Skwama",
      "Testarrosa",
      "Otaki",
      "Kataki",
      "Miura Vs",
      "Miura",
      "Katana Laces",
      "Tc Pro",
      "Katana",
      "Theory",
    ],
    Scarpa: [
      "Drago",
      "Furia",
      "Boostic",
      "Booster",
      "Instinc",
      "Vapor",
      "Maestro",
      "Chimera",
    ],
    Tenaya: [
      "Oasi",
      "Oasi Lv",
      "Iati",
      "Tarifa",
      "Mundaka",
      "Indalo",
      "Mastia",
      "Ra",
      "Ra Woman",
      "Inti",
      "Masai",
      "Tanta",
    ],
  };

  const sizeTypes = ["UK", "USM", "USW", "EU", "CM"];
  const comfortOptions = [
    "Beginners",
    "Prolonged Use",
    "Comfort Fit",
    "Tighter Fit",
  ];

  const sizes = {
    UK: [
      "1",
      "1 ½",
      "2",
      "2 ½",
      "3",
      "3 ½",
      "4",
      "4 ½",
      "5",
      "5 ½",
      "6",
      "6 ½",
      "7",
      "7 ½",
      "8",
      "8 ½",
      "9",
      "9 ½",
      "10",
      "10 ½",
      "11",
      "11 ½",
      "12",
      "12 ½",
      "13",
      "13 ½",
      "14",
    ],
    USM: [
      "2",
      "2 ½",
      "3",
      "3 ½",
      "4",
      "4 ½",
      "5",
      "5 ½",
      "6",
      "6 ½",
      "7",
      "7 ½",
      "8",
      "8 ½",
      "9",
      "9 ½",
      "10",
      "10 ½",
      "11",
      "11 ½",
      "12",
      "12 ½",
      "13",
      "13 ½",
      "14",
      "14 ½",
      "15",
    ],
    USW: [
      "3",
      "3 ½",
      "4",
      "4 ½",
      "5",
      "5 ½",
      "6",
      "6 ½",
      "7",
      "7 ½",
      "8",
      "8 ½",
      "9",
      "9 ½",
      "10",
      "10 ½",
      "11",
      "11 ½",
      "12",
      "12 ½",
      "13",
      "13 ½",
      "14",
      "14 ½",
    ],
    EU: [
      "33.0",
      "33.6",
      "34.3",
      "34.9",
      "35.6",
      "36.2",
      "36.8",
      "37.5",
      "38.1",
      "38.8",
      "39.4",
      "40.0",
      "40.7",
      "41.4",
      "42.0",
      "42.6",
      "43.2",
      "43.9",
      "44.5",
      "45.2",
      "45.8",
      "46.4",
      "47.1",
      "47.7",
      "48.4",
      "49.0",
      "49.6",
    ],
    CM: [
      "20.2",
      "20.6",
      "21.0",
      "21.4",
      "21.8",
      "22.3",
      "22.7",
      "23.1",
      "23.5",
      "24.0",
      "24.4",
      "24.8",
      "25.2",
      "25.6",
      "26.1",
      "26.5",
      "26.9",
      "27.3",
      "27.8",
      "28.2",
      "28.6",
      "29.0",
      "29.5",
      "29.9",
      "30.3",
      "30.7",
      "31.1",
    ],
  };

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

  const handleTenayaModelClick = (model) => {
    setRecommendedModel(model);
    setRecommendedUkSize(null); // Clear previous parsed size
  };

  const handleSizeTypeClick = (sizeType) => {
    setSelectedSizeType(sizeType);
    setSelectedSize(null);
    setRecommendedModel(null); // Reset recommendation when size type changes
  };

  const handleSizeClick = (size) => {
    const equivalents = getEquivalentSizes(size, selectedSizeType);
    setSelectedSize(size);
    setUserUkSize(equivalents.UK); // Store the UK size
    setRecommendedModel(null); // Reset recommendation when size changes
  };

  useEffect(() => {
    if (recommendedModel && userUkSize && selectedBrand) {
      const recommendation = getRecommendation(
        selectedBrand,
        userUkSize,
        recommendedModel
      );
      setRecommendedUkSize(recommendation.recommendedSize);
    }
  }, [recommendedModel, userUkSize, selectedBrand]);

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

  return (
    <div className="app">
      <h1>Shoe Recommendation System</h1>

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
                {["UK", "USM", "USW", "EU", "CM"].map((type) => {
                  const sizeToDisplay =
                    type === selectedSizeType
                      ? displayEquivalents[type] || "N/A"
                      : displayEquivalents[type] || "N/A";

                  return (
                    <p key={type}>
                      <span
                        style={{
                          textDecoration:
                            type === selectedSizeType ? "underline" : "none",
                        }}
                      >
                        {type}: {sizeToDisplay}
                      </span>
                    </p>
                  );
                })}
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
                {["UK", "USM", "USW", "EU", "CM"].map((type) => {
                  const sizeToDisplay = displayEquivalents[type] || "N/A";

                  return (
                    <p key={type}>
                      <span
                        style={{
                          textDecoration:
                            type === selectedSizeType ? "underline" : "none",
                        }}
                      >
                        {type}: {sizeToDisplay}
                      </span>
                    </p>
                  );
                })}
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

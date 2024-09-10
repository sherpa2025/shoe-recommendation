import { useState } from "react";
import "./App.css";
import { getEquivalentSizes } from "./sizeConversions";

const App = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedSizeType, setSelectedSizeType] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [recommendedModel, setRecommendedModel] = useState(null);

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
  };

  const handleTenayaModelClick = (model) => {
    setRecommendedModel(model);
  };

  const handleSizeTypeClick = (sizeType) => {
    setSelectedSizeType(sizeType);
    setSelectedSize(null);
    setRecommendedModel(null); // Reset recommendation when size type changes
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setRecommendedModel(null); // Reset recommendation when size changes
  };

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

  const equivalents = allSelectionsMade
    ? getEquivalentSizes(selectedSize, selectedSizeType)
    : {};

  return (
    <div className="app">
      <h1>Shoe Recommendation System</h1>

      <section className="section">
        <h3>Select brand of your previous model</h3>
        <div className="options">
          {Object.keys(brands).map((brand) => (
            <button
              key={brand}
              className={`option ${selectedBrand === brand ? "selected" : ""}`}
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
          <h3>Recommended Tenaya Models</h3>
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

          {["UK", "USM", "USW", "EU", "CM"].map((type) => (
            <p key={type}>
              <span
                style={{
                  textDecoration:
                    selectedSizeType === type ? "underline" : "none",
                }}
              >
                {type}:{" "}
                {selectedSizeType === type ? selectedSize : equivalents[type]}
              </span>
            </p>
          ))}

          <h4>
            Previous climbing shoes: {selectedBrand} {selectedModel}{" "}
            {selectedSizeType} {selectedSize}
            <br />
            New Tenaya climbing shoes: Tenaya {recommendedModel}
          </h4>
        </section>
      )}
    </div>
  );
};

export default App;

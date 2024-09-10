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
    setRecommendedModel(null);
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
          <div
            style={{
              // this styling needs to be changed later to be more responsive on screen size
              backgroundColor: "#333",
              color: "white",
              padding: "10px",
              borderRadius: "8px",
              width: "calc(25% - 40px)",
              height: "calc(25% - 40px)",
              boxSizing: "border-box",
            }}
          >
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
          </div>

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

// <!-- BEGIN Template/ajax/bloques-eleccion -->
// <!-- RESULTADO -->
// <!-- <h4>Aquí resultado de modelo-tenaya-nuevo = mundaka</h4> -->
// <div class="resultado link-dark pb-3">
//     <p class="fw-bold fs-pt-14">
//         Your recommended size:
//       Tenaya      <span class="modelo-tenaya-nuevo-anterior text-uppercase font-weight-bold"></span>
//     </p>
//     <div class="row">
//         <div class="col-md-6">
//             <div class="resultado-talla-recomendada w-100 p-3 fs-pt-14 btn-dark position-relative text-center" data-type="resultado" data-value="- ? -">- ? - </div>
//         </div>
//         <div class="col-md-6">
//             <p class="border-primary p-2">This recommendation is based on the sizes purchased by customers like you and whether or not they returned.         </p>
//         </div>
//     </div>
// </div>
// <div id="datos-comparacion" class="datos-comparacion" data-comparacion-marcas-arr='{&quot;sportiva&quot;:{&quot;oasi&quot;:&quot;0&quot;,&quot;oasi lv&quot;:&quot;0&quot;,&quot;iati&quot;:&quot;0&quot;,&quot;mundaka&quot;:&quot;0&quot;,&quot;mastia&quot;:&quot;-0.5&quot;,&quot;tarifa&quot;:&quot;0&quot;,&quot;indalo&quot;:&quot;0&quot;,&quot;ra&quot;:&quot;0.5&quot;,&quot;ra woman&quot;:&quot;0.5&quot;,&quot;inti&quot;:&quot;0.5&quot;,&quot;masai&quot;:&quot;0.5&quot;,&quot;tanta&quot;:&quot;0&quot;},&quot;scarpa&quot;:{&quot;oasi&quot;:&quot;-1&quot;,&quot;oasi lv&quot;:&quot;-1&quot;,&quot;iati&quot;:&quot;-1&quot;,&quot;mundaka&quot;:&quot;-1&quot;,&quot;mastia&quot;:&quot;-1.5&quot;,&quot;tarifa&quot;:&quot;-1&quot;,&quot;indalo&quot;:&quot;-1&quot;,&quot;ra&quot;:&quot;-0.5&quot;,&quot;ra woman&quot;:&quot;-0.5&quot;,&quot;inti&quot;:&quot;-0.5&quot;,&quot;masai&quot;:&quot;-0.5&quot;,&quot;tanta&quot;:&quot;-1&quot;},&quot;tenaya&quot;:{&quot;oasi&quot;:&quot;0&quot;,&quot;oasi lv&quot;:&quot;0&quot;,&quot;iati&quot;:&quot;0&quot;,&quot;mundaka&quot;:&quot;0&quot;,&quot;mastia&quot;:&quot;-0.5&quot;,&quot;tarifa&quot;:&quot;0&quot;,&quot;indalo&quot;:&quot;-0.5&quot;,&quot;ra&quot;:&quot;0.5&quot;,&quot;ra woman&quot;:&quot;0.5&quot;,&quot;inti&quot;:&quot;0.5&quot;,&quot;masai&quot;:&quot;0.5&quot;,&quot;tanta&quot;:&quot;0&quot;}}' data-comparacion-zapatos-arr='{&quot;beginners&quot;:{&quot;oasi&quot;:&quot;0&quot;,&quot;oasi lv&quot;:&quot;0&quot;,&quot;iati&quot;:&quot;0&quot;,&quot;tarifa&quot;:&quot;0&quot;,&quot;mundaka&quot;:&quot;0&quot;,&quot;indalo&quot;:&quot;0&quot;,&quot;mastia&quot;:&quot;-0.5&quot;,&quot;ra&quot;:&quot;0.5&quot;,&quot;ra woman&quot;:&quot;0.5&quot;,&quot;inti&quot;:&quot;0.5&quot;,&quot;masai&quot;:&quot;0.5&quot;,&quot;tanta&quot;:&quot;0.5&quot;},&quot;prolonged use&quot;:{&quot;oasi&quot;:&quot;-0.5&quot;,&quot;oasi lv&quot;:&quot;-0.5&quot;,&quot;iati&quot;:&quot;-0.5&quot;,&quot;tarifa&quot;:&quot;-0.5&quot;,&quot;mundaka&quot;:&quot;-0.5&quot;,&quot;indalo&quot;:&quot;-0.5&quot;,&quot;mastia&quot;:&quot;-1&quot;,&quot;ra&quot;:&quot;0&quot;,&quot;ra woman&quot;:&quot;0&quot;,&quot;inti&quot;:&quot;0&quot;,&quot;masai&quot;:&quot;0&quot;,&quot;tanta&quot;:&quot;0&quot;},&quot;comfort fit&quot;:{&quot;oasi&quot;:&quot;-1&quot;,&quot;oasi lv&quot;:&quot;-1&quot;,&quot;iati&quot;:&quot;-1&quot;,&quot;tarifa&quot;:&quot;-1&quot;,&quot;mundaka&quot;:&quot;-1&quot;,&quot;indalo&quot;:&quot;-1&quot;,&quot;mastia&quot;:&quot;-1.5&quot;,&quot;ra&quot;:&quot;-0.5&quot;,&quot;ra woman&quot;:&quot;-0.5&quot;,&quot;inti&quot;:&quot;-0.5&quot;,&quot;masai&quot;:&quot;-0.5&quot;,&quot;tanta&quot;:&quot;-0.5&quot;},&quot;tighter fit&quot;:{&quot;oasi&quot;:&quot;-1.5&quot;,&quot;oasi lv&quot;:&quot;-1.5&quot;,&quot;iati&quot;:&quot;-1.5&quot;,&quot;tarifa&quot;:&quot;-1.5&quot;,&quot;mundaka&quot;:&quot;-1.5&quot;,&quot;indalo&quot;:&quot;-1.5&quot;,&quot;mastia&quot;:&quot;-2&quot;,&quot;ra&quot;:&quot;-1&quot;,&quot;ra woman&quot;:&quot;-1&quot;,&quot;inti&quot;:&quot;-1&quot;,&quot;masai&quot;:&quot;-1&quot;,&quot;tanta&quot;:&quot;-1&quot;}}' data-tallas-estandar-arr='[{&quot;uk&quot;:&quot;1&quot;,&quot;usm&quot;:&quot;2&quot;,&quot;usw&quot;:&quot;3&quot;,&quot;eu&quot;:&quot;33.0&quot;,&quot;cm&quot;:&quot;20.2&quot;},{&quot;uk&quot;:&quot;1 \u00bd&quot;,&quot;usm&quot;:&quot;2 \u00bd&quot;,&quot;usw&quot;:&quot;3 \u00bd&quot;,&quot;eu&quot;:&quot;33.6&quot;,&quot;cm&quot;:&quot;20.6&quot;},{&quot;uk&quot;:&quot;2&quot;,&quot;usm&quot;:&quot;3&quot;,&quot;usw&quot;:&quot;4&quot;,&quot;eu&quot;:&quot;34.3&quot;,&quot;cm&quot;:&quot;21.0&quot;},{&quot;uk&quot;:&quot;2 \u00bd&quot;,&quot;usm&quot;:&quot;3 \u00bd&quot;,&quot;usw&quot;:&quot;4 \u00bd&quot;,&quot;eu&quot;:&quot;34.9&quot;,&quot;cm&quot;:&quot;21.4&quot;},{&quot;uk&quot;:&quot;3&quot;,&quot;usm&quot;:&quot;4&quot;,&quot;usw&quot;:&quot;5&quot;,&quot;eu&quot;:&quot;35.6&quot;,&quot;cm&quot;:&quot;21.8&quot;},{&quot;uk&quot;:&quot;3 \u00bd&quot;,&quot;usm&quot;:&quot;4 \u00bd&quot;,&quot;usw&quot;:&quot;5 \u00bd&quot;,&quot;eu&quot;:&quot;36.2&quot;,&quot;cm&quot;:&quot;22.3&quot;},{&quot;uk&quot;:&quot;4&quot;,&quot;usm&quot;:&quot;5&quot;,&quot;usw&quot;:&quot;6&quot;,&quot;eu&quot;:&quot;36.8&quot;,&quot;cm&quot;:&quot;22.7&quot;},{&quot;uk&quot;:&quot;4 \u00bd&quot;,&quot;usm&quot;:&quot;5 \u00bd&quot;,&quot;usw&quot;:&quot;6 \u00bd&quot;,&quot;eu&quot;:&quot;37.5&quot;,&quot;cm&quot;:&quot;23.1&quot;},{&quot;uk&quot;:&quot;5&quot;,&quot;usm&quot;:&quot;6&quot;,&quot;usw&quot;:&quot;7&quot;,&quot;eu&quot;:&quot;38.1&quot;,&quot;cm&quot;:&quot;23.5&quot;},{&quot;uk&quot;:&quot;5 \u00bd&quot;,&quot;usm&quot;:&quot;6 \u00bd&quot;,&quot;usw&quot;:&quot;7 \u00bd&quot;,&quot;eu&quot;:&quot;38.8&quot;,&quot;cm&quot;:&quot;24.0&quot;},{&quot;uk&quot;:&quot;6&quot;,&quot;usm&quot;:&quot;7&quot;,&quot;usw&quot;:&quot;8&quot;,&quot;eu&quot;:&quot;39.4&quot;,&quot;cm&quot;:&quot;24.4&quot;},{&quot;uk&quot;:&quot;6 \u00bd&quot;,&quot;usm&quot;:&quot;7 \u00bd&quot;,&quot;usw&quot;:&quot;8 \u00bd&quot;,&quot;eu&quot;:&quot;40.0&quot;,&quot;cm&quot;:&quot;24.8&quot;},{&quot;uk&quot;:&quot;7&quot;,&quot;usm&quot;:&quot;8&quot;,&quot;usw&quot;:&quot;9&quot;,&quot;eu&quot;:&quot;40.7&quot;,&quot;cm&quot;:&quot;25.2&quot;},{&quot;uk&quot;:&quot;7 \u00bd&quot;,&quot;usm&quot;:&quot;8 \u00bd&quot;,&quot;usw&quot;:&quot;9 \u00bd&quot;,&quot;eu&quot;:&quot;41.4&quot;,&quot;cm&quot;:&quot;25.6&quot;},{&quot;uk&quot;:&quot;8&quot;,&quot;usm&quot;:&quot;9&quot;,&quot;usw&quot;:&quot;10&quot;,&quot;eu&quot;:&quot;42.0&quot;,&quot;cm&quot;:&quot;26.1&quot;},{&quot;uk&quot;:&quot;8 \u00bd&quot;,&quot;usm&quot;:&quot;9 \u00bd&quot;,&quot;usw&quot;:&quot;10 \u00bd&quot;,&quot;eu&quot;:&quot;42.6&quot;,&quot;cm&quot;:&quot;26.5&quot;},{&quot;uk&quot;:&quot;9&quot;,&quot;usm&quot;:&quot;10&quot;,&quot;usw&quot;:&quot;11&quot;,&quot;eu&quot;:&quot;43.2&quot;,&quot;cm&quot;:&quot;26.9&quot;},{&quot;uk&quot;:&quot;9 \u00bd&quot;,&quot;usm&quot;:&quot;10 \u00bd&quot;,&quot;usw&quot;:&quot;11 \u00bd&quot;,&quot;eu&quot;:&quot;43.9&quot;,&quot;cm&quot;:&quot;27.3&quot;},{&quot;uk&quot;:&quot;10&quot;,&quot;usm&quot;:&quot;11&quot;,&quot;usw&quot;:&quot;12&quot;,&quot;eu&quot;:&quot;44.5&quot;,&quot;cm&quot;:&quot;27.8&quot;},{&quot;uk&quot;:&quot;10 \u00bd&quot;,&quot;usm&quot;:&quot;11 \u00bd&quot;,&quot;usw&quot;:&quot;12 \u00bd&quot;,&quot;eu&quot;:&quot;45.2&quot;,&quot;cm&quot;:&quot;28.2&quot;},{&quot;uk&quot;:&quot;11&quot;,&quot;usm&quot;:&quot;12&quot;,&quot;usw&quot;:&quot;13&quot;,&quot;eu&quot;:&quot;45.8&quot;,&quot;cm&quot;:&quot;28.6&quot;},{&quot;uk&quot;:&quot;11 \u00bd&quot;,&quot;usm&quot;:&quot;12 \u00bd&quot;,&quot;usw&quot;:&quot;13 \u00bd&quot;,&quot;eu&quot;:&quot;46.4&quot;,&quot;cm&quot;:&quot;29.0&quot;},{&quot;uk&quot;:&quot;12&quot;,&quot;usm&quot;:&quot;13&quot;,&quot;usw&quot;:&quot;14&quot;,&quot;eu&quot;:&quot;47.1&quot;,&quot;cm&quot;:&quot;29.5&quot;},{&quot;uk&quot;:&quot;12 \u00bd&quot;,&quot;usm&quot;:&quot;13 \u00bd&quot;,&quot;usw&quot;:&quot;14 \u00bd&quot;,&quot;eu&quot;:&quot;47.7&quot;,&quot;cm&quot;:&quot;29.9&quot;},{&quot;uk&quot;:&quot;13&quot;,&quot;usm&quot;:&quot;14&quot;,&quot;usw&quot;:&quot;&quot;,&quot;eu&quot;:&quot;48.4&quot;,&quot;cm&quot;:&quot;30.3&quot;},{&quot;uk&quot;:&quot;13 \u00bd&quot;,&quot;usm&quot;:&quot;14 \u00bd&quot;,&quot;usw&quot;:&quot;&quot;,&quot;eu&quot;:&quot;49.0&quot;,&quot;cm&quot;:&quot;30.7&quot;},{&quot;uk&quot;:&quot;14&quot;,&quot;usm&quot;:&quot;15&quot;,&quot;usw&quot;:&quot;&quot;,&quot;eu&quot;:&quot;49.6&quot;,&quot;cm&quot;:&quot;31.1&quot;}]'>
//     <div>
//         <object class="d-none metaobject">
//             <param name="marcas_arr" value="{&quot;tenaya&quot;:[&quot;oasi&quot;,&quot;oasi lv&quot;,&quot;iati&quot;,&quot;tarifa&quot;,&quot;mundaka&quot;,&quot;indalo&quot;,&quot;mastia&quot;,&quot;ra&quot;,&quot;ra woman&quot;,&quot;inti&quot;,&quot;masai&quot;,&quot;tanta&quot;],&quot;sportiva&quot;:[&quot;solution&quot;,&quot;genius&quot;,&quot;futura&quot;,&quot;skwama&quot;,&quot;testarrosa&quot;,&quot;otaki&quot;,&quot;kataki&quot;,&quot;miura vs&quot;,&quot;miura&quot;,&quot;katana laces&quot;,&quot;tc pro&quot;,&quot;katana&quot;,&quot;theory&quot;],&quot;scarpa&quot;:[&quot;drago&quot;,&quot;furia&quot;,&quot;boostic&quot;,&quot;booster&quot;,&quot;instinc&quot;,&quot;vapor&quot;,&quot;maestro&quot;,&quot;chimera&quot;]}"/>
//             <param name="tallas_estandar" value="[{&quot;uk&quot;:&quot;1&quot;,&quot;usm&quot;:&quot;2&quot;,&quot;usw&quot;:&quot;3&quot;,&quot;eu&quot;:&quot;33.0&quot;,&quot;cm&quot;:&quot;20.2&quot;},{&quot;uk&quot;:&quot;1 \u00bd&quot;,&quot;usm&quot;:&quot;2 \u00bd&quot;,&quot;usw&quot;:&quot;3 \u00bd&quot;,&quot;eu&quot;:&quot;33.6&quot;,&quot;cm&quot;:&quot;20.6&quot;},{&quot;uk&quot;:&quot;2&quot;,&quot;usm&quot;:&quot;3&quot;,&quot;usw&quot;:&quot;4&quot;,&quot;eu&quot;:&quot;34.3&quot;,&quot;cm&quot;:&quot;21.0&quot;},{&quot;uk&quot;:&quot;2 \u00bd&quot;,&quot;usm&quot;:&quot;3 \u00bd&quot;,&quot;usw&quot;:&quot;4 \u00bd&quot;,&quot;eu&quot;:&quot;34.9&quot;,&quot;cm&quot;:&quot;21.4&quot;},{&quot;uk&quot;:&quot;3&quot;,&quot;usm&quot;:&quot;4&quot;,&quot;usw&quot;:&quot;5&quot;,&quot;eu&quot;:&quot;35.6&quot;,&quot;cm&quot;:&quot;21.8&quot;},{&quot;uk&quot;:&quot;3 \u00bd&quot;,&quot;usm&quot;:&quot;4 \u00bd&quot;,&quot;usw&quot;:&quot;5 \u00bd&quot;,&quot;eu&quot;:&quot;36.2&quot;,&quot;cm&quot;:&quot;22.3&quot;},{&quot;uk&quot;:&quot;4&quot;,&quot;usm&quot;:&quot;5&quot;,&quot;usw&quot;:&quot;6&quot;,&quot;eu&quot;:&quot;36.8&quot;,&quot;cm&quot;:&quot;22.7&quot;},{&quot;uk&quot;:&quot;4 \u00bd&quot;,&quot;usm&quot;:&quot;5 \u00bd&quot;,&quot;usw&quot;:&quot;6 \u00bd&quot;,&quot;eu&quot;:&quot;37.5&quot;,&quot;cm&quot;:&quot;23.1&quot;},{&quot;uk&quot;:&quot;5&quot;,&quot;usm&quot;:&quot;6&quot;,&quot;usw&quot;:&quot;7&quot;,&quot;eu&quot;:&quot;38.1&quot;,&quot;cm&quot;:&quot;23.5&quot;},{&quot;uk&quot;:&quot;5 \u00bd&quot;,&quot;usm&quot;:&quot;6 \u00bd&quot;,&quot;usw&quot;:&quot;7 \u00bd&quot;,&quot;eu&quot;:&quot;38.8&quot;,&quot;cm&quot;:&quot;24.0&quot;},{&quot;uk&quot;:&quot;6&quot;,&quot;usm&quot;:&quot;7&quot;,&quot;usw&quot;:&quot;8&quot;,&quot;eu&quot;:&quot;39.4&quot;,&quot;cm&quot;:&quot;24.4&quot;},{&quot;uk&quot;:&quot;6 \u00bd&quot;,&quot;usm&quot;:&quot;7 \u00bd&quot;,&quot;usw&quot;:&quot;8 \u00bd&quot;,&quot;eu&quot;:&quot;40.0&quot;,&quot;cm&quot;:&quot;24.8&quot;},{&quot;uk&quot;:&quot;7&quot;,&quot;usm&quot;:&quot;8&quot;,&quot;usw&quot;:&quot;9&quot;,&quot;eu&quot;:&quot;40.7&quot;,&quot;cm&quot;:&quot;25.2&quot;},{&quot;uk&quot;:&quot;7 \u00bd&quot;,&quot;usm&quot;:&quot;8 \u00bd&quot;,&quot;usw&quot;:&quot;9 \u00bd&quot;,&quot;eu&quot;:&quot;41.4&quot;,&quot;cm&quot;:&quot;25.6&quot;},{&quot;uk&quot;:&quot;8&quot;,&quot;usm&quot;:&quot;9&quot;,&quot;usw&quot;:&quot;10&quot;,&quot;eu&quot;:&quot;42.0&quot;,&quot;cm&quot;:&quot;26.1&quot;},{&quot;uk&quot;:&quot;8 \u00bd&quot;,&quot;usm&quot;:&quot;9 \u00bd&quot;,&quot;usw&quot;:&quot;10 \u00bd&quot;,&quot;eu&quot;:&quot;42.6&quot;,&quot;cm&quot;:&quot;26.5&quot;},{&quot;uk&quot;:&quot;9&quot;,&quot;usm&quot;:&quot;10&quot;,&quot;usw&quot;:&quot;11&quot;,&quot;eu&quot;:&quot;43.2&quot;,&quot;cm&quot;:&quot;26.9&quot;},{&quot;uk&quot;:&quot;9 \u00bd&quot;,&quot;usm&quot;:&quot;10 \u00bd&quot;,&quot;usw&quot;:&quot;11 \u00bd&quot;,&quot;eu&quot;:&quot;43.9&quot;,&quot;cm&quot;:&quot;27.3&quot;},{&quot;uk&quot;:&quot;10&quot;,&quot;usm&quot;:&quot;11&quot;,&quot;usw&quot;:&quot;12&quot;,&quot;eu&quot;:&quot;44.5&quot;,&quot;cm&quot;:&quot;27.8&quot;},{&quot;uk&quot;:&quot;10 \u00bd&quot;,&quot;usm&quot;:&quot;11 \u00bd&quot;,&quot;usw&quot;:&quot;12 \u00bd&quot;,&quot;eu&quot;:&quot;45.2&quot;,&quot;cm&quot;:&quot;28.2&quot;},{&quot;uk&quot;:&quot;11&quot;,&quot;usm&quot;:&quot;12&quot;,&quot;usw&quot;:&quot;13&quot;,&quot;eu&quot;:&quot;45.8&quot;,&quot;cm&quot;:&quot;28.6&quot;},{&quot;uk&quot;:&quot;11 \u00bd&quot;,&quot;usm&quot;:&quot;12 \u00bd&quot;,&quot;usw&quot;:&quot;13 \u00bd&quot;,&quot;eu&quot;:&quot;46.4&quot;,&quot;cm&quot;:&quot;29.0&quot;},{&quot;uk&quot;:&quot;12&quot;,&quot;usm&quot;:&quot;13&quot;,&quot;usw&quot;:&quot;14&quot;,&quot;eu&quot;:&quot;47.1&quot;,&quot;cm&quot;:&quot;29.5&quot;},{&quot;uk&quot;:&quot;12 \u00bd&quot;,&quot;usm&quot;:&quot;13 \u00bd&quot;,&quot;usw&quot;:&quot;14 \u00bd&quot;,&quot;eu&quot;:&quot;47.7&quot;,&quot;cm&quot;:&quot;29.9&quot;},{&quot;uk&quot;:&quot;13&quot;,&quot;usm&quot;:&quot;14&quot;,&quot;usw&quot;:&quot;&quot;,&quot;eu&quot;:&quot;48.4&quot;,&quot;cm&quot;:&quot;30.3&quot;},{&quot;uk&quot;:&quot;13 \u00bd&quot;,&quot;usm&quot;:&quot;14 \u00bd&quot;,&quot;usw&quot;:&quot;&quot;,&quot;eu&quot;:&quot;49.0&quot;,&quot;cm&quot;:&quot;30.7&quot;},{&quot;uk&quot;:&quot;14&quot;,&quot;usm&quot;:&quot;15&quot;,&quot;usw&quot;:&quot;&quot;,&quot;eu&quot;:&quot;49.6&quot;,&quot;cm&quot;:&quot;31.1&quot;}]"/>
//             <param name="comparacion_marcas_arr" value="{&quot;sportiva&quot;:{&quot;oasi&quot;:&quot;0&quot;,&quot;oasi lv&quot;:&quot;0&quot;,&quot;iati&quot;:&quot;0&quot;,&quot;mundaka&quot;:&quot;0&quot;,&quot;mastia&quot;:&quot;-0.5&quot;,&quot;tarifa&quot;:&quot;0&quot;,&quot;indalo&quot;:&quot;0&quot;,&quot;ra&quot;:&quot;0.5&quot;,&quot;ra woman&quot;:&quot;0.5&quot;,&quot;inti&quot;:&quot;0.5&quot;,&quot;masai&quot;:&quot;0.5&quot;,&quot;tanta&quot;:&quot;0&quot;},&quot;scarpa&quot;:{&quot;oasi&quot;:&quot;-1&quot;,&quot;oasi lv&quot;:&quot;-1&quot;,&quot;iati&quot;:&quot;-1&quot;,&quot;mundaka&quot;:&quot;-1&quot;,&quot;mastia&quot;:&quot;-1.5&quot;,&quot;tarifa&quot;:&quot;-1&quot;,&quot;indalo&quot;:&quot;-1&quot;,&quot;ra&quot;:&quot;-0.5&quot;,&quot;ra woman&quot;:&quot;-0.5&quot;,&quot;inti&quot;:&quot;-0.5&quot;,&quot;masai&quot;:&quot;-0.5&quot;,&quot;tanta&quot;:&quot;-1&quot;},&quot;tenaya&quot;:{&quot;oasi&quot;:&quot;0&quot;,&quot;oasi lv&quot;:&quot;0&quot;,&quot;iati&quot;:&quot;0&quot;,&quot;mundaka&quot;:&quot;0&quot;,&quot;mastia&quot;:&quot;-0.5&quot;,&quot;tarifa&quot;:&quot;0&quot;,&quot;indalo&quot;:&quot;-0.5&quot;,&quot;ra&quot;:&quot;0.5&quot;,&quot;ra woman&quot;:&quot;0.5&quot;,&quot;inti&quot;:&quot;0.5&quot;,&quot;masai&quot;:&quot;0.5&quot;,&quot;tanta&quot;:&quot;0&quot;}}"/>
//             <param name="comparacion_zapatos_arr" value="{&quot;beginners&quot;:{&quot;oasi&quot;:&quot;0&quot;,&quot;oasi lv&quot;:&quot;0&quot;,&quot;iati&quot;:&quot;0&quot;,&quot;tarifa&quot;:&quot;0&quot;,&quot;mundaka&quot;:&quot;0&quot;,&quot;indalo&quot;:&quot;0&quot;,&quot;mastia&quot;:&quot;-0.5&quot;,&quot;ra&quot;:&quot;0.5&quot;,&quot;ra woman&quot;:&quot;0.5&quot;,&quot;inti&quot;:&quot;0.5&quot;,&quot;masai&quot;:&quot;0.5&quot;,&quot;tanta&quot;:&quot;0.5&quot;},&quot;prolonged use&quot;:{&quot;oasi&quot;:&quot;-0.5&quot;,&quot;oasi lv&quot;:&quot;-0.5&quot;,&quot;iati&quot;:&quot;-0.5&quot;,&quot;tarifa&quot;:&quot;-0.5&quot;,&quot;mundaka&quot;:&quot;-0.5&quot;,&quot;indalo&quot;:&quot;-0.5&quot;,&quot;mastia&quot;:&quot;-1&quot;,&quot;ra&quot;:&quot;0&quot;,&quot;ra woman&quot;:&quot;0&quot;,&quot;inti&quot;:&quot;0&quot;,&quot;masai&quot;:&quot;0&quot;,&quot;tanta&quot;:&quot;0&quot;},&quot;comfort fit&quot;:{&quot;oasi&quot;:&quot;-1&quot;,&quot;oasi lv&quot;:&quot;-1&quot;,&quot;iati&quot;:&quot;-1&quot;,&quot;tarifa&quot;:&quot;-1&quot;,&quot;mundaka&quot;:&quot;-1&quot;,&quot;indalo&quot;:&quot;-1&quot;,&quot;mastia&quot;:&quot;-1.5&quot;,&quot;ra&quot;:&quot;-0.5&quot;,&quot;ra woman&quot;:&quot;-0.5&quot;,&quot;inti&quot;:&quot;-0.5&quot;,&quot;masai&quot;:&quot;-0.5&quot;,&quot;tanta&quot;:&quot;-0.5&quot;},&quot;tighter fit&quot;:{&quot;oasi&quot;:&quot;-1.5&quot;,&quot;oasi lv&quot;:&quot;-1.5&quot;,&quot;iati&quot;:&quot;-1.5&quot;,&quot;tarifa&quot;:&quot;-1.5&quot;,&quot;mundaka&quot;:&quot;-1.5&quot;,&quot;indalo&quot;:&quot;-1.5&quot;,&quot;mastia&quot;:&quot;-2&quot;,&quot;ra&quot;:&quot;-1&quot;,&quot;ra woman&quot;:&quot;-1&quot;,&quot;inti&quot;:&quot;-1&quot;,&quot;masai&quot;:&quot;-1&quot;,&quot;tanta&quot;:&quot;-1&quot;}}"/>
//         </object>
//     </div>
// </div>
// <script>
//     (function() {
//         /* Autoejecutable: limpieza por si usuario ha ido hacia atrás en su elección */
//         jQuery('.ajax-target-pie-de-gato-confort').html('');
//     }
//     )();
// </script>
// <script>
//     (function() {
//         /* Autoejecutable: hay que saber qué va eligiendo el usuario */
//         // DOM cleaning
//         LimpiaDOMCompararTallas("pie-de-gato");

//         // stores user selections
//         ShowUserSelectedOptions("pie-de-gato");

//         //console.log('---> FROM BLOCKS $data_type =', 'modelo-tenaya-nuevo')
//         // shows recommended size
//         ShowRecommendedSize("pie-de-gato");
//     }
//     )();
// </script>
// <!-- END Template/ajax/bloques-eleccion -->

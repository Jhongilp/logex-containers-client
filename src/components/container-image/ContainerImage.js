import { useState, useEffect, useRef } from "react";

import "./ContainerImage.css";

import { fetchReadImage, fetchAnalyzeImage } from "../../api";

export const ContainerImage = ({ imageUrl }) => {
  const timerRef = useRef(null);

  const handleOnAnalyzeImage = async () => {
    try {
      window.clearInterval(timerRef.current);
      const operationLocationUrl = await fetchReadImage(imageUrl);
      console.log("got operation url: ", operationLocationUrl);

      timerRef.current = window.setInterval(async () => {
        let response = await fetchAnalyzeImage(operationLocationUrl);
        console.log("fetching read data status: ", response.status);
        if (response.status === "succeeded") {
          window.clearInterval(timerRef.current);
          console.log("image data: ", response.analyzeResult.readResults);
        }
      }, 5000);
    } catch (error) {
      console.log("azure reading image error: ", error);
    }
  };

  return (
    <div className="image-container-section">
      <div className="image-preview">
        <img src={imageUrl} alt="container preview" />
      </div>
      <div>
        <div>
          <button
            type="button"
            className="analyze-btn"
            onClick={handleOnAnalyzeImage}
          >
            ANALIZAR
          </button>
        </div>
      </div>
    </div>
  );
};

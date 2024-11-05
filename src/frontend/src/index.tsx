import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";

// Dynamically load Kakao Maps API script
const loadKakaoMapScript = () => {
  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}`;
  script.async = true;
  script.onerror = () => {
    console.error("Kakao Maps API failed to load.");
  };
  document.head.appendChild(script);
};

loadKakaoMapScript();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

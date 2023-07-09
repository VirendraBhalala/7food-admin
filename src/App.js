import React from "react";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
// eact-lazy-load-image-component
import "react-lazy-load-image-component/src/effects/blur.css";
// css
import "./assets/css/base.css";
//toas.css
import "react-toastify/dist/ReactToastify.css";
// swiper
import "swiper/css";
import "swiper/css/navigation";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;

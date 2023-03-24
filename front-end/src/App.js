import React, { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanks"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />

      <Routes>
        {/* <Route extact path="/" Component={Home} />  */}
        <Route extact path="/" element={<Home />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

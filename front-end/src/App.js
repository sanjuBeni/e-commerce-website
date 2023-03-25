import React, { useEffect } from "react";
import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";

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
        {/* <Route extact path="/" Component={Home} /> */}
        <Route extact path="/" element={<Home />} />
        <Route extact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route extact path="/product/:id" element={<ProductDetails />} />
        <Route extact path="/Search" element={<Search />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;

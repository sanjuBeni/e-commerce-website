import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import MetaData from "../layout/MetaData";
import "./Home.css";
import ProductCard from "./ProductCard";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const { loading, products, productsCount, error } = useSelector(
    (state) => state.products
  );
  // console.log(products, productsCount, success);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <>
      <MetaData title="ECOMMERCE HOME PAGE" />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCT BELOW</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Product</h2>

      <div className="container" id="container">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          products &&
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        )}
      </div>
    </>
  );
}

export default Home;

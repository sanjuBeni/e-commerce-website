import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import MetaData from "../layout/MetaData";
import "./Home.css";
import Product from "./Product";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const { loading, success, products, productsCount, error } = useSelector(
    (state) => state.products
  );
  // console.log(products, productsCount, success);
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const pro = {
    name: "Blue Tshirt",
    image: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
    price: "₹3000",
    _id: "sanjay",
  };

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
          <Product product={pro} />
        )}
      </div>
    </>
  );
}

export default Home;

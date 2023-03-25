import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import ProductCard from "../../component/Home/ProductCard";
import "./Product.css";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

export default function Products() {
  const dispatch = useDispatch();

  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const [price, setPrice] = useState([0, 25000]);

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const { loading, products, productsCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  return (
    <>
      {loading ? (
        <h3>Loader...</h3>
      ) : (
        <>
          <MetaData title="ECOMMERCE - PRODUCTS" />
          <div className="products">
            {products &&
              products.map((item, index) => {
                return <ProductCard key={index} product={item} />;
              })}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
          </div>

          <Typography>Categories</Typography>
          <ul className="categoryBox">
            {categories.map((cat) => (
              <li
                className="category-link"
                key={cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>

          <fieldset>
            <Typography component="legend">Ratings Above</Typography>
            <Slider
              value={ratings}
              onChange={(e, newRatings) => {
                setRatings(newRatings);
              }}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="on"
              min={0}
              max={5}
            />
          </fieldset>

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Pre"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

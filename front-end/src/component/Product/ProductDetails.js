import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import MetaData from "../layout/MetaData";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, product, errro } = useSelector(
    (state) => state.productDetails
  );

  const classes = {
    carousel: {
      height: "200px",
      width: "100%",
      "& img": {
        height: "200px",
        width: "-webkit-fill-available",
      },
    },
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <MetaData title={`${product.name} --- Details`} />
          <div className="ProductDetails">
            <div>
              {/* <Carousel autoPlay={false} className={classes.carousel}> */}
              {product.image &&
                product.image.map((item, i) => {
                  return (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  );
                })}
              {/* </Carousel> */}
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span> ({product.numOfReviews} Reviews) </span>
              </div>
              <div className="detailsBlock-3">
                <h1>₹{product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input type="number" value="1" readOnly />
                    <button>+</button>
                  </div>{" "}
                  <button>Add to Cart</button>
                </div>

                <p>
                  Status:{" "}
                  <b
                    className={`${
                      product.stock < 1 ? "redColor" : "greenColor"
                    }`}
                  >
                    {product.stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Reviews</button>
            </div>
          </div>

          <h3 className="reviewsHeading">Reviews</h3>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review, index) => {
                  return <ReviewCard key={index} review={review} />;
                })}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
}

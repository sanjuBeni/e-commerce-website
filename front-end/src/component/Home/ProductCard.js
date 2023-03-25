import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function ProductCard({ product }) {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img
        // src={
        //   product.image[0].url
        //     ? product.image[0].url
        //     : "https://i.ibb.co/DRST11n/1.webp"
        // }
        src="https://i.ibb.co/DRST11n/1.webp"
        alt="img"
      />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />{" "}
        <span> ({product.numOfReviews} Reviews) </span>
      </div>
      <span>₹{product.price}</span>
    </Link>
  );
}

export default ProductCard;

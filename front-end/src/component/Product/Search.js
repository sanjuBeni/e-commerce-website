import React, { useState } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
import { useNavigate } from "react-router-dom";

function Search() {
  const [keyword, setKeyWord] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();

    keyword.trim() ? navigate(`/products/${keyword}`) : navigate(`/products`);
  };

  return (
    <>
      <MetaData title="Search a Product" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Serach a Product..."
          onChange={(e) => setKeyWord(e.target.value)}
        ></input>
        <input type="submit" value="Search" />
      </form>
    </>
  );
}

export default Search;

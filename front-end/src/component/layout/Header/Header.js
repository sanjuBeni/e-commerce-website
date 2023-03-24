import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/E-Commerce.png";

export default function Header() {
  const option = {
    burgerColor: "#009688",
    burgerColorHover: "#1de9b6",
    logo: logo,
    logoHoverSize: "10px",
    navColor1: "white",
    link1Text: "Home",
    link2Text: "Product",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/product",
    link3Url: "/contact",
    link4Url: "/about",
    link1Margin: "5px",
    link1ColorHover: "#d4e157",
    link2ColorHover: "#d4e157",
    link3ColorHover: "#d4e157",
    link4ColorHover: "#d4e157",
  };
  return <ReactNavbar {...option} />;
}

import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import logo from "../../../images/E-Commerce.png";

export default function Header() {
  const option = {
    burgerColor: "#009688",
    burgerColorHover: "#1de9b6",
    logo,
    logoHoverSize: "10px",
    navColor1: "white",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link5Text: "Search",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Margin: "5px",
    link1ColorHover: "#d4e157",
    link2ColorHover: "#d4e157",
    link3ColorHover: "#d4e157",
    link4ColorHover: "#d4e157",
    profileIcon: true,
    profileIconColor: "rgba(35, 35, 35,0.8)",
    ProfileIconElement: MdAccountCircle,
    searchIcon: true,
    searchIconColor: "rgba(35, 35, 35,0.8)",
    SearchIconElement: MdSearch,
    cartIcon: true,
    cartIconColor: "rgba(35, 35, 35,0.8)",
    CartIconElement: MdAddShoppingCart,
  };
  return <ReactNavbar {...option} />;
}

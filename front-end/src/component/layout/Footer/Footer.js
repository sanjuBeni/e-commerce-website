import React from "react";
import appleStore from "../../../images/apple-store.png";
import googleStore from "../../../images/google-play.png";
import "./footer.css";

export default function Footer() {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS Mobile Phone</p>
        <img src={appleStore} alt="playStore" />
        <img src={googleStore} alt="appStore" />
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>Hight Quality is our first priority</p>
        <p>Copyrights 2023 &copy; MeSanjayBeniwal</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://github.com">Instagram</a>
        <a href="https://github.com">You Tube</a>
        <a href="https://github.com">Facebook</a>
      </div>
    </footer>
  );
}

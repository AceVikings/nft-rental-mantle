import React from "react";
import "../styles/Navbar.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { connectWallet, address } = props;

  return (
    <div className="navbar">
      <Link to="/" className="nav--home">
        <img className="nav--logo" src={logo} />
        <h1>EzCombo</h1>
      </Link>

      <ul>
        <li>
          <Link to="/combo" className="nav--link">
            Combo
          </Link>
        </li>
        <li>
          <div className="wallet-button" onClick={connectWallet}>
            {address ? address : "Connect Wallet"}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

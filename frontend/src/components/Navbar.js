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
        <h1>EzRent</h1>
      </Link>

      <ul>
        <li>
          <Link to="/wrap" className="nav--link">
            Wrap
          </Link>
        </li>
        <li>
          <Link to="/approve" className="nav--link">
            Approve
          </Link>
        </li>
        <li>
          <Link to="/rent" className="nav--link">
            Rent
          </Link>
        </li>
        <li>
          <Link to="/unwrap" className="nav--link">
            Unwrap
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

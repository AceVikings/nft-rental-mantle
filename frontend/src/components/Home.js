import React from "react";
import "../styles/Home.css";
const Home = () => {
  return (
    <div className="home">
      <h1 className="home--header">Welcome to EzCombo</h1>
      <p className="home--text">
        This is still a work in progress, come back later
      </p>
      <div className="home--box">
        <h2>How it works</h2>
        <h3>Step 1</h3>
        <p>
          Create a new Combo contract, this is linked to the address that
          created it and can only be used by that wallet
        </p>
        <h3>Step 2</h3>
        <p>
          Create Combo transactions by adding in new transactions by filling the
          form with transaction info
        </p>
        <h3>Step 3</h3>
        <p>
          Execute a single transaction combining all the required transactions
        </p>
      </div>
    </div>
  );
};

export default Home;

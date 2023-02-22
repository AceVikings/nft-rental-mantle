import React from "react";
import "../styles/Home.css";
const Home = () => {
  return (
    <div className="home">
      <h1 className="home--header">Welcome to EzRents</h1>
      <p className="home--text">
        This is still a work in progress, come back later
      </p>
      <div className="home--box">
        <h2>How it works</h2>
        <h3>Step 1</h3>
        <p>
          Wrap your existing NFT to generate a new NFT that can be rented by
          other users, you can unwrap to receive your NFT back
        </p>
        <h3>Step 2</h3>
        <p>
          Approve a renter address and a duration of renting, you can only
          approve 1 renter at a time
        </p>
        <h3>Step 3</h3>
        <p>
          Renter can then rent that NFT and ownerOf function returns renter
          address as the owner for the duration
        </p>
      </div>
    </div>
  );
};

export default Home;

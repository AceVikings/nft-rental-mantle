import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Wrap from "./components/Wrap";
import Approve from "./components/Approve";
import Rent from "./components/Rent";
import Unwrap from "./components/Unwrap";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import wrapperABI from "./abis/wrapper.json";
function App() {
  const [address, setAddress] = useState();
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  async function requestWallet() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAddress(accounts[0]);

      const signerProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await signerProvider.getSigner(0);
      const contract = new Contract(
        "0x1281b0F20df286C86ED78F56a6AC24c82EA3De59",
        wrapperABI,
        signer
      );
      setSigner(signer);
      setContract(contract);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    requestWallet();
  }, []);

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      requestWallet();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <Navbar connectWallet={connectWallet} address={address} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/wrap"
          element={
            <Wrap contract={contract} signer={signer} address={address} />
          }
        />
        <Route
          path="/approve"
          element={
            <Approve contract={contract} signer={signer} address={address} />
          }
        />
        <Route
          path="/rent"
          element={
            <Rent contract={contract} signer={signer} address={address} />
          }
        />
        <Route
          path="/unwrap"
          element={
            <Unwrap contract={contract} signer={signer} address={address} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { ethers, ZeroAddress, Contract } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Base.css";
import "../styles/Wrap.css";
import nftABI from "../abis/nft.json";
import wrnftABI from "../abis/wrnft.json";

const Wrap = (props) => {
  const { contract, signer, address } = props;
  const [nft, setNFT] = useState();
  const [wrapper, setWrapper] = useState();
  const [nftContract, setNftContract] = useState();
  const [wrnftContract, setWRNftContract] = useState();
  const [tokenId, setId] = useState();

  const getWrapped = async () => {
    const wrapper = await contract?.wrapperAddress(nft);
    if (wrapper !== ZeroAddress) {
      const nftContract = new Contract(nft, nftABI, signer);
      setNftContract(nftContract);
      const wrContract = new Contract(wrapper, wrnftABI, signer);
      setWRNftContract(wrContract);
    }
    console.log(wrapper);
    setWrapper(wrapper);
  };

  const createWrapper = async () => {
    const tx = await contract.wrapNFT(nft);
    toast.info(`Transaction sent with hash ${tx.hash}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    const receipt = await tx.wait();
    if (receipt.status === 1) {
      toast.success(`Wrapper created!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      getWrapped();
    } else {
      toast.error(`Creation failed!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const getApprovalAndWrap = async () => {
    const tx = await nftContract.setApprovalForAll(wrapper, true);
    toast.info(`Approval sent with ${tx.hash}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "dark",
    });

    const receipt = await tx.wait();
    if (receipt.status === 1) {
      toast.success(`Approved!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(`Approval failed!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    }
    handleWrap();
  };

  const handleWrap = async () => {
    if (!nft) return;

    const singleApproved = await nftContract.getApproved(tokenId);
    const allApproved = await nftContract.isApprovedForAll(address, wrapper);

    if (singleApproved === wrapper || allApproved) {
      const tx = await wrnftContract.wrap(tokenId);
      toast.info(`Wrap Request sent with ${tx.hash}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });

      const receipt = await tx.wait();
      if (receipt.status === 1) {
        toast.success(`Successfully Wrapped!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error(`Wrap failed!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      getApprovalAndWrap();
    }
  };

  const handleChange = (event) => {
    setNFT(event.target.value);
  };

  const handleTokenChange = (event) => {
    setId(event.target.value);
  };
  return (
    <div className="page">
      <ToastContainer />
      {contract && (
        <>
          <h1 className="wrap-header">Wrap</h1>
          <input
            className="input-address"
            placeholder="<nft address>"
            onChange={handleChange}
          ></input>
          <div className="nft-button" onClick={getWrapped}>
            Check Wrapper
          </div>
        </>
      )}
      {!contract && (
        <>
          <h2 className="wrap-h2">
            Oops! Looks like you haven't connected Metamask!
          </h2>
        </>
      )}
      {wrapper === ZeroAddress && (
        <>
          <h2 className="wrap-h2">
            Oops! Looks like wrapper doesn't exist for this address
          </h2>
          <div className="nft-button" onClick={createWrapper}>
            Create Wrapper
          </div>
        </>
      )}
      {wrapper && wrapper !== ZeroAddress && (
        <>
          <h2 className="wrap-h2">Enter a token to wrap</h2>
          <input
            placeholder="TokenID"
            onChange={handleTokenChange}
            value={tokenId}
          ></input>
          <div className="wrap-button" onClick={handleWrap}>
            Wrap Token
          </div>
        </>
      )}
    </div>
  );
};

export default Wrap;

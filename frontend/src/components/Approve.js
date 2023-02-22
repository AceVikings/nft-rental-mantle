import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ZeroAddress, Contract } from "ethers";
import "../styles/Base.css";
import "../styles/Wrap.css";
import wrnftABI from "../abis/wrnft.json";
const Approve = (props) => {
  const { contract, signer, address } = props;
  const [nft, setNFT] = useState();
  const [wrapper, setWrapper] = useState();
  const [wrnftContract, setWRNftContract] = useState();
  const [form, setForm] = useState({ token: "", to: "", duration: "" });

  const getWrapped = async () => {
    const wrapper = await contract?.wrapperAddress(nft);
    if (wrapper !== ZeroAddress) {
      const wrContract = new Contract(wrapper, wrnftABI, signer);
      setWRNftContract(wrContract);
    }
    console.log(wrapper);
    setWrapper(wrapper);
  };

  const handleApprove = async () => {
    const tx = await wrnftContract.approveRental(
      form.token,
      form.to,
      form.duration
    );
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
      toast.success(`Successfully Approved Rental!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error(`Rental Approval failed!`, {
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

  const handleChange = (event) => {
    setNFT(event.target.value);
  };

  const handleFormChange = (event) => {
    setForm((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };
  return (
    <div className="page">
      <ToastContainer />
      {contract && (
        <>
          <h1 className="wrap-header">Approve</h1>
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
            Oops! Looks like wrapper doesn't exist for this address, go to
            "Wrap" to create Wrapper
          </h2>
        </>
      )}
      {wrapper && wrapper !== ZeroAddress && (
        <>
          <h2 className="wrap-h2">Enter a token to Rent</h2>
          <input
            placeholder="TokenID"
            name="token"
            onChange={handleFormChange}
          />
          <input
            placeholder="to address"
            name="to"
            onChange={handleFormChange}
          />
          <input
            placeholder="duration in s"
            name="duration"
            onChange={handleFormChange}
          />
          <div className="wrap-button unwrap" onClick={handleApprove}>
            Approve Rent
          </div>
        </>
      )}
    </div>
  );
};

export default Approve;

// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "./wRNFT.sol";

contract NFTWrapper is Ownable {
    address IMPLEMENTAION;
    uint public FEES;

    mapping(address => address) public wrapperAddress;

    constructor(address _impl) {
        IMPLEMENTAION = _impl;
    }

    function wrapNFT(address _nft) external {
        wrapperAddress[_nft] = Clones.cloneDeterministic(
            IMPLEMENTAION,
            keccak256(abi.encode(_nft))
        );
        wRNFT(wrapperAddress[_nft]).init(_nft);
    }

    function setFees(uint _fees) external onlyOwner {
        FEES = _fees;
    }

    function setImplementation(address _impl) external onlyOwner {
        IMPLEMENTAION = _impl;
    }
}

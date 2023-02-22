// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

import "./IFullERC721.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";

contract wRNFT is ERC721EnumerableUpgradeable {
    IFullERC721 rootNFT;

    struct rentInfo {
        address renter;
        uint rentStartTime;
        uint duration;
    }

    struct approveInfo {
        address renter;
        uint duration;
    }

    mapping(uint => address) public tokenOwner;
    mapping(uint => approveInfo) public approvedRenter;
    mapping(uint => rentInfo) public rentalInfo;

    modifier notRented(uint tokenId) {
        require(
            block.timestamp >
                rentalInfo[tokenId].rentStartTime +
                    rentalInfo[tokenId].duration,
            "Currently rented"
        );
        _;
    }

    function init(address _nft) external initializer {
        rootNFT = IFullERC721(_nft);
        __ERC721_init(
            string(abi.encodePacked("Wrapped Rental", rootNFT.name())),
            string(abi.encodePacked("wR", rootNFT.symbol()))
        );
    }

    function wrap(uint tokenId) external {
        require(rootNFT.ownerOf(tokenId) == msg.sender, "Not owner");
        tokenOwner[tokenId] = msg.sender;
        rootNFT.transferFrom(msg.sender, address(this), tokenId);
        _mint(msg.sender, tokenId);
    }

    function approveRental(
        uint tokenId,
        address to,
        uint duration
    ) external notRented(tokenId) {
        require(tokenOwner[tokenId] == msg.sender, "Not owner");
        require(to != address(0), "Can't approve address 0");
        approvedRenter[tokenId] = approveInfo(to, duration);
    }

    function rentToken(uint tokenId) external notRented(tokenId) {
        require(_exists(tokenId), "Token doesn't exist");
        require(approvedRenter[tokenId].renter == msg.sender, "Not approved");
        rentalInfo[tokenId] = rentInfo(
            msg.sender,
            block.timestamp,
            approvedRenter[tokenId].duration
        );
        delete approvedRenter[tokenId];
    }

    function unWrap(uint tokenId) external notRented(tokenId) {
        require(tokenOwner[tokenId] == msg.sender, "Not owner");
        rootNFT.transferFrom(address(this), msg.sender, tokenId);
        delete tokenOwner[tokenId];
        _burn(tokenId);
    }

    function ownerOf(
        uint256 tokenId
    )
        public
        view
        override(IERC721Upgradeable, ERC721Upgradeable)
        returns (address)
    {
        if (
            block.timestamp <=
            rentalInfo[tokenId].rentStartTime + rentalInfo[tokenId].duration
        ) {
            return rentalInfo[tokenId].renter;
        } else {
            return tokenOwner[tokenId];
        }
    }
}

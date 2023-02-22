// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

import "./IFullERC721.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";

contract wRNFT is ERC721EnumerableUpgradeable {
    IFullERC721 rootNFT;

    mapping(uint => address) public tokenOwner;

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

    // function rent()

    function unWrap(uint tokenId) external {
        require(tokenOwner[tokenId] == msg.sender, "Not owner");
        rootNFT.transferFrom(address(this), msg.sender, tokenId);
        delete tokenOwner[tokenId];
        _burn(tokenId);
    }
}

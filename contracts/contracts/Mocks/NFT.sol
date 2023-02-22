// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NFT is ERC721Enumerable {
    constructor() ERC721("Test", "TST") {}

    function mint() external {
        _mint(msg.sender, totalSupply() + 1);
    }
}

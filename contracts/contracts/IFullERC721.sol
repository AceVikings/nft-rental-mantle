// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/interfaces/IERC721.sol";

interface IFullERC721 is IERC721 {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);
}

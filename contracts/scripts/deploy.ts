import { ethers } from "hardhat";
import { NFT__factory, NFT } from "../typechain-types";
import { WRNFT__factory, WRNFT } from "../typechain-types";
import { NFTWrapper__factory, NFTWrapper } from "../typechain-types";
async function main() {
  const NFTFactory: NFT__factory = await ethers.getContractFactory("NFT");
  const NFT: NFT = await NFTFactory.deploy();
  console.log(`NFT deployed at: ${NFT.address}`);
  const WRNFTFactory = await ethers.getContractFactory("wRNFT");
  const wRNFT: WRNFT = await WRNFTFactory.deploy();
  console.log(`Implemetation deployed at: ${wRNFT.address}`);
  const NFTWrapperFactory: NFTWrapper__factory =
    await ethers.getContractFactory("NFTWrapper");
  const NFTWrapper = await NFTWrapperFactory.deploy(wRNFT.address);
  console.log(`Wrapper deployed at: ${NFTWrapper.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

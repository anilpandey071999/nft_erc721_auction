// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const MindDefToken = await hre.ethers.getContractFactory("MindDefToken");
  const mindDefToken = await MindDefToken.deploy();

  await mindDefToken.deployed()

  const MindDefnft = await hre.ethers.getContractFactory("MindDefnft");
  const mindDefnft = await MindDefnft.deploy();

  await mindDefnft.deployed()

  const MinddefContract = await hre.ethers.getContractFactory("MinddefContract");
  const minddefContract = await MinddefContract.deploy(mindDefnft.address,mindDefToken.address,"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");

  await minddefContract.deployed();

  console.log('const marketPlaceAddress ="', minddefContract.address,'"');;
  console.log('const tokenAddress ="', mindDefToken.address,'"');;
  console.log('const nftAddress ="', mindDefnft.address,'"');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

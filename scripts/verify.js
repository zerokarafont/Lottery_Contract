require('dotenv').config();
const hre = require('hardhat');

(async() => {
  await hre.run("verify:verify", {
    address: process.env.LOTTERY_CONTRACT_ADDRESS,
  });
})();
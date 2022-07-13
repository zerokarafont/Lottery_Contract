const chalk = require('chalk');
const hre = require('hardhat');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const rewriteEnv = (contract, name) => {
  const envPath = join(__dirname, '../', '.env');
  const envFile = readFileSync(envPath, { encoding: 'utf-8' });
  const appendLine = `${name} = ${
    typeof contract === 'string' ? contract : contract.address
  }`;
  const reg = new RegExp(`${name} = .*`);
  const newFile = envFile.replace(reg, appendLine);
  writeFileSync(envPath, newFile, { flag: 'w' });
  console.log(chalk.blue(`${name} appended to .env`));
};

async function main() {
  const [owner] = await hre.ethers.getSigners();
  const ownerAccount = await owner.getAddress();

  // 部署彩票合约
  const Lottery = await hre.ethers.getContractFactory('Lottery');
  const lottery = await Lottery.deploy();

  // await lottery.deployed();
  await lottery.deployTransaction.wait(5);
  console.log(
    chalk.green('Lottery Contract successfully deployed to: '),
    chalk.yellow(lottery.address)
  );

  rewriteEnv(lottery, 'LOTTERY_CONTRACT_ADDRESS');

  // 部署VRF合约
  await lottery.instantiateVRF(8317);

  // const vrf = await lottery.VRF();
  // console.log(
  //   chalk.green('VRF Contract successfully deployed to: '),
  //   chalk.yellow(vrf)
  // );

  // rewriteEnv(vrf, 'VRF_CONTRACT_ADDRESS');

  console.log(chalk.magentaBright('deploy done.'));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

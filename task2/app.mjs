import { ethers } from 'ethers';
import {abi} from './abi.js';
import dotenv from 'dotenv';
dotenv.config({path:'../.env'});

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

(async () => {
  try {
    let account1 = new ethers.Wallet(process.env.pk1, provider);
    let account2 = new ethers.Wallet(process.env.pk2, provider);
    const contract = new ethers.Contract("0x48E53F92e04bD517C2b13f1ca88b718241F2ecd8", abi, account1);
    const contract2 = new ethers.Contract("0x48E53F92e04bD517C2b13f1ca88b718241F2ecd8", abi, account2);

    // transfer
    const tx1 = await contract.transfer(account2.address, ethers.utils.parseUnits('30',6));
    await tx1.wait();
    console.log(await ethers.utils.formatUnits(await contract.balanceOf(account2.address), 6).toString());

    // approve
    const tx2 = await contract2.approve(account1.address, ethers.utils.parseUnits('1000000000000000',6));
    await tx2.wait();

    // allowance
    console.log(await ethers.utils.formatUnits(await contract2.allowance(account2.address, account1.address), 6).toString());

    // transferFrom
    const tx3 = await contract.transferFrom(account2.address, account1.address, ethers.utils.parseUnits('80',6));
    await tx3.wait();
    console.log(await ethers.utils.formatUnits(await contract.balanceOf(account1.address), 6).toString());
  }
  catch (error) {
    console.log(error.message);
  }
})();
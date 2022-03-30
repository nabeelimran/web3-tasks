import { ethers } from 'ethers';
import dotenv from 'dotenv';
dotenv.config({path:'../.env'});
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

(async function main() {
  const account1 = new ethers.Wallet(process.env.pk1, provider);
  const account2 = new ethers.Wallet(process.env.pk2, provider);
  console.log("Balance before transfer");
  const balance1 = ethers.utils.formatEther(await (await account1.getBalance()).toString());
  const balance2 = ethers.utils.formatEther(await (await account2.getBalance()).toString());
  console.log(balance1);
  console.log(balance2);
  
  console.log("Balance after transfer");
  const tx = await account1.sendTransaction({
    to: account2.address,
    value: ethers.utils.parseEther("0.005"),
  });
  await tx.wait();
  console.log(tx.hash);
  const balance1After = ethers.utils.formatEther(await (await account1.getBalance()).toString());
  const balance2After = ethers.utils.formatEther(await (await account2.getBalance()).toString());
  console.log(balance1After);
  console.log(balance2After);
  
})();


// const signer = provider.get
// const hash = signer.signMessage("Hello World");
// let convert = ethers.utils.formatEther("20100000000000000000");
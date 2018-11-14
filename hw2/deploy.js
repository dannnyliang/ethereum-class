const fs = require('fs');
const Web3 = require('web3');

let web3 = new Web3('http://localhost:8545');

const abi = JSON.parse(
  fs.readFileSync('./contract/__hw2_Bank_sol_Bank.abi').toString(),
);
const bytecode =
  '0x' + fs.readFileSync('./contract/__hw2_Bank_sol_Bank.bin').toString();

let bank = new web3.eth.Contract(abi);

web3.eth.getAccounts().then(accounts => {
  // deploy contract
  // your code
  bank
    .deploy({
      data: bytecode,
    })
    .send({
      from: accounts[0],
      gas: 1500000,
    })
    .on('receipt', receipt => console.log(receipt))
});

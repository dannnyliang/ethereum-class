const fs = require('fs');
const path = require('path');

const rootPath = path.resolve(process.cwd(), './hw3/contract');

const abiPath = path.resolve(rootPath, '__hw3_contract_Bank_sol_Bank.abi');
const abi = fs.readFileSync(abiPath);

const binPath = path.resolve(rootPath, '__hw3_contract_Bank_sol_Bank.bin');
const bytecode = '0x' + fs.readFileSync(binPath).toString();

const combine = `{
  "abi": ${abi},
  "bytecode": "${bytecode}"
}`;

fs.writeFileSync(path.resolve(rootPath, 'Bank.json'), combine);

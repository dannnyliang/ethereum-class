// npm-library
const Wallet = require('ethereumjs-wallet');
const keccak256 = require('js-sha3').keccak256;

// keypair
const wallet = Wallet.generate();
// privKey
const privKey = wallet.getPrivateKey();
console.log("private key:", privKey);
// pubKey
const pubKey = wallet.getPublicKey();
console.log("public key:", pubKey);
// address
let address = wallet.getAddressString();
console.log("address:", address);

//---Answer2a---
console.log("\n---Answer2a---");
//hex private key
console.log("hex private key:", privKey.toString('hex'));
//hex public key
console.log("hex public key:", pubKey.toString('hex'));

//---Answer2b---
console.log("\n---Answer2b---");
//hash public kwy
const public_key_hash = keccak256(pubKey);
console.log("hash public key:", public_key_hash);
//obtain the address by hashing the public key
const address2 = `0x${public_key_hash.substr(public_key_hash.length - 40)}`;
console.log("address:", address2);

//---Answer2c---
console.log("\n---Answer2c---");
const Keystore = { "address": "41d76ced3c3fa77026156e1c02e2db154978f24c", "crypto": { "cipher": "aes-128-ctr", "ciphertext": "143cb9dedbb662b550eb62e13744e2d0ea55b5da071395d77b3a65d4dee61aee", "cipherparams": { "iv": "992f1bfb2145162021db2d67dca045ca" }, "kdf": "scrypt", "kdfparams": { "dklen": 32, "n": 262144, "p": 1, "r": 8, "salt": "d3e10c1ff6d8094c37aa8057b153e3dcc8bcb6f380fcaf120c1acba207a09dc4" }, "mac": "6a98abc43523ad63a136e4a3785d29ed780dc5ccdf3fdc4ee084264615973b05" }, "id": "efe1e113-b731-49dd-ac87-09f57ee93b1d", "version": 3 }
console.log("Keystore:\n", Keystore);

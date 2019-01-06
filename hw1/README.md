# Ethereum Class

### Homework 1

**1. Please compare hash function and cryptographic hash function and give an example.**  
Answer:  
`cryptographic hash function`是其中一種`hash function`  
`cryptographic hash function`有以下幾種特色，並且在某些方面有特殊的要求
- 相同的input message必須有相同的hash結果
- 即使input message只有小小的改動，hash結果會截然不同
- 必須很難從hash的結果回推出原先的input message
- 必須很難找到兩個不同的input message產出相同的hash結果  

區別`cryptographic hash function`與其他`hash function`在於「目的性」，其他`hash function`的目的可能只是為了區別原本的input內容有所改動，對於蓄意想要產出相同hash結果的行為不一定能好好防範
其次，正因為`cryptographic hash function`有比較多的要求，在速度上比起其他`hash function`會略嫌遜色一些

|Categories|Examples
|---|---
|Cryptographic Functions|SHA3-256, MD5, ...
|Non-Cryptographic Functions|Pearson hashing, Buzhash, ...

**2. Peter is a noob in cryptocurrency and would like to get some Ethers. First step for him is to have an Ethereum account. He decides to generate an account and manages the wallet himself so he can understand the principles behind. From the class, he knows the account is created by the following steps:**  
Answer:  
---Answer2a---  
hex private key: 1711647fae4d37f42b229c239998771277c3a562ed5ced43ee76b806efa6683e  
hex public key: b601fac514ddc74213be2b6e90e54f95e484f72f5b5ddfaab1554ed7d506b23a6b7ec0bd7127eded1437879131ebc57dcf3c20521fb5918709c4cf23f6b7c6b7

---Answer2b---  
hash public key: 64a5b369e164d7fd13d6a2e0ecb19feab0afcff3fe0469308ba05c94e5a93758  
address: 0xecb19feab0afcff3fe0469308ba05c94e5a93758  

---Answer2c---  
Keystore:  
```javascript
{ address: '41d76ced3c3fa77026156e1c02e2db154978f24c',  
  crypto:  
   { cipher: 'aes-128-ctr',  
     ciphertext: '143cb9dedbb662b550eb62e13744e2d0ea55b5da071395d77b3a65d4dee61aee',  
     cipherparams: { iv: '992f1bfb2145162021db2d67dca045ca' },  
     kdf: 'scrypt',
     kdfparams:
      { dklen: 32,
        n: 262144,
        p: 1,
        r: 8,
        salt: 'd3e10c1ff6d8094c37aa8057b153e3dcc8bcb6f380fcaf120c1acba207a09dc4' },
     mac: '6a98abc43523ad63a136e4a3785d29ed780dc5ccdf3fdc4ee084264615973b05' },
  id: 'efe1e113-b731-49dd-ac87-09f57ee93b1d',
  version: 3 }
```

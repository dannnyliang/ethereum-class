# Ethereum Class

### Homework 1

**1. Please compare hash function and cryptographic hash function and give an example.**  
Answer:  
`cryptographic hash function`是其中一種`hash function`  
`cryptographic hash function`有以下幾種特色，並且在某些方面有特殊的要求
- 相同的input message必須有相同的hash結果
- 即使input message只有小小的改動，hash結果會截然不同
- 必須很難從hash的結果回推出原先的input message
- 必須很難找到兩個不同的input message產出相同的hash結果  

區別`cryptographic hash function`與其他`hash function`在於「目的性」，其他`hash function`的目的可能只是為了區別原本的input內容有所改動，對於蓄意想要產出相同hash結果的行為不一定能好好防範
其次，正因為`cryptographic hash function`有比較多的要求，在速度上比起其他`hash function`會略嫌遜色一些

|Categories|Examples
|---|---
|Cryptographic Functions|SHA3-256, MD5, ...
|Non-Cryptographic Functions|Pearson hashing, Buzhash, ...

**2. Peter is a noob in cryptocurrency and would like to get some Ethers. First step for him is to have an Ethereum account. He decides to generate an account and manages the wallet himself so he can understand the principles behind. From the class, he knows the account is created by the following steps:**  
Answer:  
*in `hw1/key.js`*
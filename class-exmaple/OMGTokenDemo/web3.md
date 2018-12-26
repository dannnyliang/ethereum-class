```bash
> omgtoken.address                                              // 取得合約地址

> eth.getCode(omgtoken.address)                                 // 取得合約 bytecode

> personal.newAccount()                                         // 產生新帳號

> personal.listAccounts                                         // 列出錢包中的帳號地址

> a = eth.accounts[0]                                           // 將錢包中第一個帳號設為代號 a

> b = eth.accounts[1]                                           // 將錢包中第一個帳號設為代號 b

> omgtoken.balanceOf(a)                                         // 取得在 OMG 合約中, a 地址擁有多少代幣數量

> omgtoken.mint.sendTransaction(a, 1000000, {from: a})          // 發行 1000000 個 OMG 代幣, 分配給 a

> omgtoken.balanceOf(a)                                         // 取得在 OMG 合約中, a 地址擁有多少代幣數量

> omgtoken.transfer.sendTransaction(b, 1000, {from: a})         // 從 a 帳號轉帳 1000 個代幣給 b 帳號

// 查看 Transaction 內容
> eth.getTransaction("0x6219dbda0402fd6c8278a7222fa4f905e42bcf0ec9736f3d6883dd55c8724ce5")
{
  blockHash: "0x3b49b10f647e8936e408e86f7020919f5454eb2da101a3c4ca7a9976f7eb77ae",
  blockNumber: 10,
  from: "0xbecf1b43144259f8b3d11fef6d6514e09db43706",
  gas: 90000,
  gasPrice: 1,
  hash: "0x6219dbda0402fd6c8278a7222fa4f905e42bcf0ec9736f3d6883dd55c8724ce5",
  input: "0xa9059cbb000000000000000000000000e4b9ee6dbe8c9a483f912d19ea24641321507c1e0000000000000000000000000000000000000000000000000000000000000064",
  nonce: 9,
  r: "0xbeece17cf350cd711ed2d796b0980f8e53c00d5f0bd7cfab60394fd9a5b8aec3",
  s: "0x26a3db2c061f9addb1089d9f4c0ef8495a1a6e81970df52aacb55284a242be90",
  to: "0x6d427ef4856fc4714721276d62ba9ab8ba1c9bde",
  transactionIndex: 0,
  v: "0xa96",
  value: 0
}

// 查看收據
> eth.getTransactionReceipt("0x6219dbda0402fd6c8278a7222fa4f905e42bcf0ec9736f3d6883dd55c8724ce5")
{
  blockHash: "0x3b49b10f647e8936e408e86f7020919f5454eb2da101a3c4ca7a9976f7eb77ae",
  blockNumber: 10,
  contractAddress: null,
  cumulativeGasUsed: 36655,
  from: "0xbecf1b43144259f8b3d11fef6d6514e09db43706",
  gasUsed: 36655,
  logs: [{
      address: "0x6d427ef4856fc4714721276d62ba9ab8ba1c9bde",
      blockHash: "0x3b49b10f647e8936e408e86f7020919f5454eb2da101a3c4ca7a9976f7eb77ae",
      blockNumber: 10,
      data: "0x0000000000000000000000000000000000000000000000000000000000000064",
      logIndex: 0,
      removed: false,
      topics: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "0x000000000000000000000000becf1b43144259f8b3d11fef6d6514e09db43706", "0x000000000000000000000000e4b9ee6dbe8c9a483f912d19ea24641321507c1e"],
      transactionHash: "0x6219dbda0402fd6c8278a7222fa4f905e42bcf0ec9736f3d6883dd55c8724ce5",
      transactionIndex: 0
  }],
  logsBloom: "0x00000000000200000000000000000040000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000002000000000002000000000000000000000000000000000000000000000000000000000000010000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000002000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000020000000000000000000000000",
  status: "0x1",
  to: "0x6d427ef4856fc4714721276d62ba9ab8ba1c9bde",
  transactionHash: "0x6219dbda0402fd6c8278a7222fa4f905e42bcf0ec9736f3d6883dd55c8724ce5",
  transactionIndex: 0
}
```
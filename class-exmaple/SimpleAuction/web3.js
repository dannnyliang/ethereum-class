// 執行 geth
執行一個私人本地的開發測試鏈，每 5 秒進行挖礦產生一個新區塊
$ geth --dev --dev.period 5

// 產生 4 個新帳號, 密碼為空
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x89454b11634fddbfc342c3a905faa3935f54f3b9"
"0xe5b56e17d1ed8d262376a8968cb27911da8269a4"
"0x9e23c98f7e93f581b308ca9d719efd6a6c0541c2"
"0x96a8fce49feaa244b31857277eef47da7571a8ec"

// 為每個帳號給個 id 方便操作
> a = eth.accounts[0]
"0x58cb2fbd0646c39e9275e817627ca6524e417aac"
> b = eth.accounts[1]
"0x89454b11634fddbfc342c3a905faa3935f54f3b9"
> c = eth.accounts[2]
"0xe5b56e17d1ed8d262376a8968cb27911da8269a4"
> d = eth.accounts[3]
"0x9e23c98f7e93f581b308ca9d719efd6a6c0541c2"
> e = eth.accounts[4]
"0x96a8fce49feaa244b31857277eef47da7571a8ec"

// 查詢帳戶餘額
> web3.fromWei(eth.getBalance(a), 'ether')
1.15792089237316195423570985008687907853269984665640564039457584007913129639927e+59
> web3.fromWei(eth.getBalance(b), 'ether')
0
> web3.fromWei(eth.getBalance(c), 'ether')
0
> web3.fromWei(eth.getBalance(d), 'ether')
0
> web3.fromWei(eth.getBalance(e), 'ether')
0

// 為了後續的合約操作，每個帳號給一點錢 100 ETH
> eth.sendTransaction({from: a, to: b, value:web3.toWei(100, "ether")})
"0xcc0de7589e1820a61203d656fd9f93c9e3327128325a565f391e9efc8432c983"
> eth.sendTransaction({from: a, to: c, value:web3.toWei(100, "ether")})
"0xe72b5ae9dca478a079db6c0c64f3988c869e1f6c07d19c26a503d8cd02233cad"
> eth.sendTransaction({from: a, to: d, value:web3.toWei(100, "ether")})
"0xb91b1c8ca9fd5078849f3c62c1102fcf10824fb01cf63e0387870a9285857148"
> eth.sendTransaction({from: a, to: e, value:web3.toWei(100, "ether")})
"0xf59a717adccef3fa838546f4bb4b76f425bf674a8bef5c957e6fb795eac53b81"

// 驗證看看 b 的戶頭
> web3.fromWei(eth.getBalance(b), 'ether')
100

// 部署合約
deploy simpleauction

personal.unlockAccount(c)
personal.unlockAccount(d)
personal.unlockAccount(e)

// 拍賣結束的時間
> simpleauction.auctionClose.call()
1543849629

// c, d, e 分別進行競標拍賣
> simpleauction.bid.sendTransaction({from: c, value:web3.toWei(10, "ether")})
"0x40d961d4a478396c8792f6e9cfccf6afede95a8df5ac4ee1f4bf5eaba295564b"
> simpleauction.highestBid.call()
10000000000000000000
> simpleauction.bid.sendTransaction({from: d, value:web3.toWei(11, "ether")})
"0x447fd93f02d16b14d2af39dfadc889007191df59f70c57d27c711e209cecdf74"
> simpleauction.bid.sendTransaction({from: e, value:web3.toWei(12, "ether")})
"0x53f4013e1cc3ac6dd27265654a8deab7509f2a55a383bca23675aa9844d859d1"

// 利用取得最新區塊的時間知道拍賣時間是否快結束
> eth.getBlock('latest').timestamp
1543849614
> simpleauction.auctionClose.call()
1543849629

// 有人觸發拍賣結束
> simpleauction.auctionEnd.sendTransaction({from: a})

// 查詢帳戶餘額
> web3.fromWei(eth.getBalance(c), 'ether')
89.999999999999936294
> web3.fromWei(eth.getBalance(d), 'ether')
88.999999999999945529
> web3.fromWei(eth.getBalance(e), 'ether')
87.999999999999945529

// 沒有競標到的人，拿回自己的標金，遇到錯誤因為帳戶需要 unlock 
> simpleauction.withdraw.sendTransaction({from: c})
Error: authentication needed: password or unlock
    at web3.js:3143:20
    at web3.js:6347:15
    at web3.js:5081:36
    at web3.js:4137:16
    at <anonymous>:1:1

// 直到 geth 執行結束前，都一直 unlock 帳戶
> personal.unlockAccount(c, '', 0)
true
> personal.unlockAccount(d, '', 0)
true
> personal.unlockAccount(e, '', 0)
true
>

// 領回標金
> simpleauction.withdraw.sendTransaction({from: c})
"0x0278fc0715c38a63b4bbd7a328340c3d12dc7d92a19fecb170b997c94019bcb4"
> web3.fromWei(eth.getBalance(c), 'ether')
99.999999999999916732
> simpleauction.withdraw.sendTransaction({from: d})
"0x2b34a331797c5a24d0a230eca7a6d219a249bac76eb36910d9accdc0566266b8"
> web3.fromWei(eth.getBalance(d), 'ether')
99.999999999999925967
> simpleauction.withdraw.sendTransaction({from: e})
"0xb2f3acc313727242567a23d70f0587a24cb91d2a37cd42377e8b5a2c2bc51e12"
> web3.fromWei(eth.getBalance(e), 'ether')
87.999999999999923599

// b 成功拍賣，拿到最高標 e 的標金
> web3.fromWei(eth.getBalance(b), 'ether')
112

// 查看 storage 狀況
> eth.getStorageAt(simpleauction.address, 0)
"0x00000000000000000000000089454b11634fddbfc342c3a905faa3935f54f3b9"
> eth.getStorageAt(simpleauction.address, 1)
"0x000000000000000000000000000000000000000000000000000000005c055b2e"
> eth.getStorageAt(simpleauction.address, 2)
"0x00000000000000000000000058cb2fbd0646c39e9275e817627ca6524e417aac"
> eth.getStorageAt(simpleauction.address, 3)
"0x0000000000000000000000000000000000000000000000056bc75e2d63100000"
> eth.getStorageAt(simpleauction.address, 4)
"0x0000000000000000000000000000000000000000000000000000000000000000"
> eth.getStorageAt(simpleauction.address, 5)
"0x0000000000000000000000000000000000000000000000000000000000000001"

// 如果遇到 mapping 的結構

mapping(address => uint) pendingReturns;

calculate new index 

> key   = '00000000000000000000000xe5b56e17d1ed8d262376a8968cb27911da8269a4'
> index = '0000000000000000000000000000000000000000000000000000000000000004'
> newIndex = web3.sha3(key+index, {"encoding":"hex"})
> eth.getStorageAt(simpleauction.address, newIndex)
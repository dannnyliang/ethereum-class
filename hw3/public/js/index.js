'use strict'

let contractAddress = $('#contractAddress');
let deployedContractAddressInput = $('#deployedContractAddressInput');
let loadDeployedContractButton = $('#loadDeployedContractButton');
let deployNewContractButton = $('#deployNewContractButton');

let killContractButton = $('#killContractButton')

let whoami = $('#whoami');
let whoamiButton = $('#whoamiButton');
let copyButton = $('#copyButton');

let update = $('#update');

let logger = $('#logger');

let deposit = $('#deposit');
let depositButton = $('#depositButton');

let withdraw = $('#withdraw');
let withdrawButton = $('#withdrawButton');

let transferEtherTo = $('#transferEtherTo');
let transferEtherValue = $('#transferEtherValue');
let transferEtherButton = $('#transferEtherButton');

let mintCoin = $('#mintCoin');
let mintCoinButton = $('#mintCoinButton');

let buyCoin = $('#buyCoin');
let buyCoinButton = $('#buyCoinButton');

let transferCoinTo = $('#transferCoinTo');
let transferCoinValue = $('#transferCoinValue');
let transferCoinButton = $('#transferCoinButton');

let owner = $('#owner');
let checkOwnerButton = $('#checkOwnerButton');

let transferOwnerTo = $('#transferOwnerTo');
let transferOwnerButton = $('#transferOwnerButton');

let transferEtherAdvTo = $('#transferEtherAdvTo');
let transferEtherAdvValue = $('#transferEtherAdvValue');
let transferEtherAdvButton = $('#transferEtherAdvButton');

let bankAddress = "";
let nowAccount = "";

function log(...inputs) {
	for (let input of inputs) {
		if (typeof input === 'object') {
			input = JSON.stringify(input, null, 2)
		}
		logger.html(input + '\n' + logger.html())
	}
}

function parseToInt(input) { return Number.parseInt(input) };

function getFetch(path = '/', body = {}, failText = '失敗') {
	return fetch(path, body)
	.then(res => {
		if (!res.ok) {
			log(res.statusText, failText) 
			return
		};
		update.trigger('click');
		return res.json();
	})
}

function postFetch(path = '/', body = {}, failText = '失敗') {
	return fetch(path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
	})
	.then(res => {
		if (!res.ok) {
			log(res.statusText, failText)
			return
		};
		update.trigger('click');
		return res.json();
	})
}

// 載入使用者至 select tag
$.get('/accounts', function (accounts) {
	for (let account of accounts) {
		whoami.append(`<option value="${account}">${account}</option>`)
	}
	nowAccount = whoami.val();

	update.trigger('click')

	log(accounts, '以太帳戶')
})

// 當按下載入既有合約位址時
loadDeployedContractButton.on('click', function () {
	loadBank(deployedContractAddressInput.val())
})

// 當按下部署合約時
deployNewContractButton.on('click', function () {
	newBank()
})

// 當按下登入按鍵時
whoamiButton.on('click', async function () {

	nowAccount = whoami.val();

	update.trigger('click')

})

// 當按下複製按鍵時
copyButton.on('click', function () {
	let textarea = $('<textarea />')
	textarea.val(whoami.val()).css({
		width: '0px',
		height: '0px',
		border: 'none',
		visibility: 'none'
	}).prependTo('body')

	textarea.focus().select()

	try {
		if (document.execCommand('copy')) {
			textarea.remove()
			return true
		}
	} catch (e) {
		console.log(e)
	}
	textarea.remove()
	return false
})

// 當按下更新按鍵時
// TODO: NCCU coin balance
update.on('click', function () {
	if (bankAddress != "") {
		$.get('/allBalance', {
			address: bankAddress,
			account: nowAccount
		}, function (result) {
			log({
				address: nowAccount,
				ethBalance: result.ethBalance,
				bankBalance: result.bankBalance,
				coinBalance: result.coinBalance
			})
			log('更新帳戶資料')

			$('#ethBalance').text('以太帳戶餘額 (wei): ' + result.ethBalance)
			$('#bankBalance').text('銀行ETH餘額 (wei): ' + result.bankBalance)
			$('#coinBalance').text('NCCU COIN餘額: ' + result.coinBalance)
		})
	}
	else {
		$.get('/balance', {
			account: nowAccount
		}, function (result) {
			$('#ethBalance').text('以太帳戶餘額 (wei): ' + result.ethBalance)
			$('#bankBalance').text('銀行ETH餘額 (wei): ')
			$('#coinBalance').text('NCCU COIN餘額: ')
		})
	}
})

// 當按下刪除合約按鈕時
killContractButton.on('click', async function () {

	if (bankAddress == "") {
		return;
	}

	// 解鎖
	let unlock = await unlockAccount();
	if (!unlock) {
		return;
	}

	// 更新介面 
	waitTransactionStatus();
	// 刪除合約
	$.post('/kill', {
		address: bankAddress,
		account: nowAccount
	}, function (result) {
		if (result.transactionHash !== undefined) {
			log(bankAddress, '成功刪除合約');

			bankAddress = "";
			contractAddress.text('合約位址:' + bankAddress)
			deployedContractAddressInput.val(bankAddress)

			// 觸發更新帳戶資料
			update.trigger('click');

			// 更新介面 
			doneTransactionStatus();
		}
		else {
			log(result)
			// 更新介面 
			doneTransactionStatus();

		}
	})
})

// 當按下存款按鍵時
depositButton.on('click', async function () {

	if (bankAddress == "") {
		return;
	}

	// 解鎖
	let unlock = await unlockAccount();
	if (!unlock) {
		return;
	}

	// 更新介面 
	waitTransactionStatus();
	// 存款
	$.post('/deposit', {
		address: bankAddress,
		account: nowAccount,
		value: parseToInt(deposit.val()),
	}, function (result) {
		if (result.events !== undefined) {
			log(result.events.DepositEvent.returnValues, '存款成功')

			// 觸發更新帳戶資料
			update.trigger('click')

			// 更新介面 
			doneTransactionStatus()
		}
		else {
			log(result)
			// 更新介面 
			doneTransactionStatus()
		}
	})

})

// 當按下提款按鍵時
withdrawButton.on('click', async function () {

	if (bankAddress == "") {
		return;
	}

	// 解鎖
	let unlock = await unlockAccount();
	if (!unlock) {
		return;
	}

	// 更新介面
	waitTransactionStatus()
	// 提款
	$.post('/withdraw', {
		address: bankAddress,
		account: nowAccount,
		value: parseToInt(withdraw.val()),
	}, function (result) {
		if (result.events !== undefined) {
			log(result.events.WithdrawEvent.returnValues, '提款成功')

			// 觸發更新帳戶資料
			update.trigger('click')

			// 更新介面 
			doneTransactionStatus()
		}
		else {
			log(result)
			// 更新介面 
			doneTransactionStatus()
		}
	})
})

// 當按下轉帳按鍵時
transferEtherButton.on('click', async function () {

	if (bankAddress == "") {
		return;
	}

	// 解鎖
	let unlock = await unlockAccount();
	if (!unlock) {
		return;
	}

	// 更新介面
	waitTransactionStatus()
	// 轉帳
	$.post('/transfer', {
		address: bankAddress,
		account: nowAccount,
		to: transferEtherTo.val(),
		value: parseToInt(transferEtherValue.val()),
	}, function (result) {
		if (result.events !== undefined) {
			log(result.events.TransferEvent.returnValues, '轉帳成功')

			// 觸發更新帳戶資料
			update.trigger('click')

			// 更新介面 
			doneTransactionStatus()
		}
		else {
			log(result)
			// 更新介面 
			doneTransactionStatus()
		}
	})
})

// TODO:
// ...
checkOwnerButton.on('click', () => {
	const body = {
		address: bankAddress,
		account: nowAccount,	
	}
	getFetch('/owner', body)
	.then(res => owner.text('Owner 帳戶：' + res.owner))
})

mintCoinButton.on('click', async () => {

	// 解鎖
	let unlock = await unlockAccount();
	if (!unlock) {
		return;
	}

	const body = {
		address: bankAddress,
		account: nowAccount,
		value: parseToInt(mintCoin.val()),
	}
	postFetch('/mintCoin', body, '鑄幣失敗')
	.then(res => log(res.events.MintEvent.returnValues, '鑄幣成功'))
})

buyCoinButton.on('click', async () => {

	// 解鎖
	let unlock = await unlockAccount();
	if (!unlock) {
		return;
	}

	const body = {
		address: bankAddress,
		account: nowAccount,
		value: parseToInt(buyCoin.val()),
	}
	postFetch('/buyCoin', body, '買幣失敗')
	.then(res => log(res.events.BuyCoinEvent.returnValues, '買幣成功'))
})

transferCoinButton.on('click', async () => {

	// 解鎖
	let unlock = await unlockAccount();
	if (!unlock) {
		return;
	}

	const body = {
		address: bankAddress,
		account: nowAccount,
		to: transferCoinTo.val(),
		value: parseToInt(transferCoinValue.val()),
	}
	postFetch('/transferCoin', body, '轉幣失敗')
	.then(res => log(res.events.TransferCoinEvent.returnValues, '轉幣成功'))
})

transferOwnerButton.on('click', async () => {

	// 解鎖
	let unlock = await unlockAccount();
	if (!unlock) {
		return;
	}

	const body = {
		address: bankAddress,
		account: nowAccount,
		to: transferOwnerTo.val(),
	}
	postFetch('/transferOwner', body, '轉移所有權失敗')
	.then(res => log(res.events.TransferOwnerEvent.returnValues, '轉移所有權成功'))
})

transferEtherAdvButton.on('click', async () => {

	// 解鎖
	let unlock = await unlockAccount();
	if (!unlock) {
		return;
	}
	
	const body = {
		account: nowAccount,
		to: transferEtherAdvTo.val(),
		value: parseToInt(transferEtherAdvValue.val()),
	}
	postFetch('/transferAdvTo', body, '轉帳失敗')
	.then(() => { log('轉帳成功') })
})

// 載入bank合約
function loadBank(address) {
	if (!(address === undefined || address === null || address === '')) {
		$.get('/contract', {
			address: address
		}, function (result) {
			if (result.bank != undefined) {
				bankAddress = address;

				contractAddress.text('合約位址:' + address)
				log(result.bank, '載入合約')

				update.trigger('click')
			}
			else {
				log(address, '載入失敗')
			}
		})
	}
}

// 新增bank合約
async function newBank() {

	// 解鎖
	let unlock = await unlockAccount();
	if (!unlock) {
		return;
	}

	// 更新介面
	waitTransactionStatus()

	$.post('/deploy', {
		account: nowAccount
	}, function (result) {
		if (result.contractAddress) {
			log(result, '部署合約')

			// 更新合約介面
			bankAddress = result.contractAddress
			contractAddress.text('合約位址:' + result.contractAddress)
			deployedContractAddressInput.val(result.contractAddress)

			update.trigger('click');

			// 更新介面
			doneTransactionStatus();
		}
	})
}

function waitTransactionStatus() {
	$('#accountStatus').html('帳戶狀態 <b style="color: blue">(等待交易驗證中...)</b>')
}

function doneTransactionStatus() {
	$('#accountStatus').text('帳戶狀態')
}


async function unlockAccount() {
	let password = prompt("請輸入你的密碼", "");
	if (password == null) {
		return false;
	}
	else {
		return $.post('/unlock', {
			account: nowAccount,
			password: password
		})
			.then(function (result) {
				if (result == 'true') {
					return true;
				}
				else {
					alert("密碼錯誤")
					return false;
				}
			})
	}
}
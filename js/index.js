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
let updateCont = $('#updateCont');

let finish = $('#finish');

let earlyfinish = $('#earlyfinish');
let time2end = $('#time2end');

let logger = $('#logger');

let deposit = $('#deposit');
let depositButton = $('#depositButton');

let cdeposit = $('#cdeposit');
let cdepositButton = $('#cdepositButton');
let cdepositTime = $('#cdepositTime');

let withdraw = $('#withdraw');
let withdrawButton = $('#withdrawButton');

let transferEtherTo = $('#transferEtherTo');
let transferEtherValue = $('#transferEtherValue');
let transferEtherButton = $('#transferEtherButton');

let bankAddress = "";
let nowAccount = "";

let web3 = new Web3('http://localhost:8545');

let bank = new web3.eth.Contract(bankAbi);

function log(...inputs) {
	
	for (let input of inputs) {
		if(input.profit){
			alert("certificate deposit's profit == " + String(input.profit));
		}
		if (typeof input === 'object') {
			input = JSON.stringify(input, null, 2)
		}
		logger.html(input + '\n' + logger.html())
	}
}

init()

async function init() {
	let accounts = await web3.eth.getAccounts()

	for (let account of accounts) {
		whoami.append(`<option value="${account}">${account}</option>`)
	}
	nowAccount = whoami.val();

	update.trigger('click')

	log(accounts, '以太帳戶')
}

// 當按下載入既有合約位址時
loadDeployedContractButton.on('click', function () {
	loadBank(deployedContractAddressInput.val())
})

// 當按下部署合約時
deployNewContractButton.on('click', function () {
	newBank()
})

// 當按下登入按鍵時
whoamiButton.on('click', function () {

	nowAccount = whoami.val();

	update.trigger('click')
	updateCont.trigger('click')

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
update.on('click', async function () {
	if (bankAddress != "") {
		let ethBalance = await web3.eth.getBalance(nowAccount)
		let bankBalance = await bank.methods.getBankBalance().call({ from: nowAccount })

		log({
			address: bankAddress,
			ethBalance: ethBalance,
			bankBalance: bankBalance
		})
		log('更新帳戶資料')

		$('#ethBalance').text('以太帳戶餘額 (wei): ' + ethBalance)
		$('#bankBalance').text('銀行ETH餘額 (wei): ' + bankBalance)
	}
	else {
		let ethBalance = await web3.eth.getBalance(nowAccount)

		$('#ethBalance').text('以太帳戶餘額 (wei): ' + ethBalance)
		$('#bankBalance').text('銀行ETH餘額 (wei): ')
	}
})

// 當按下更新合約按鍵時
updateCont.on('click', async function () {
	if (bankAddress != "") {
		var value = await bank.methods.getCdeposit().call({from: nowAccount})
		let money = value[0]
		let time = value[1]
		
		log({
			address: bankAddress,
			money: money,
			time: time
		})
		log('更新合約資料')

		$('#money').text('定存本金 (wei): ' + money)
		$('#time').text('期數 : ' + time)
	}
	else {

		$('#money').text('定存本金 (wei): ')
		$('#time').text('期數: ')
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
	bank.methods.kill().send({
		from: nowAccount,
		gas: 3400000
	})
		.on('receipt', function (receipt) {
			log(bankAddress, '成功刪除合約');

			bankAddress = "";
			contractAddress.text('合約位址:' + bankAddress)
			deployedContractAddressInput.val(bankAddress)

			// 觸發更新帳戶資料
			update.trigger('click');

			// 更新介面 
			doneTransactionStatus();
		})
		.on('error', function (error) {
			log(error.toString())
			// 更新介面 
			doneTransactionStatus();
		})
})

// 當按下合約期滿按鈕時
finish.on('click', async function () {

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
	// 
	bank.methods.cendcontract().send({
		from: nowAccount,
		gas: 3400000
	})
	    .on('receipt', function (receipt) {
		log(receipt.events.EndcontEvent.returnValues,'定存期滿')
		
		update.trigger('click');
		updateCont.trigger('click');
		
		doneTransactionStatus();

	    })
	    
	    .on('error', function (error) {
		log(error.toString())
		
     	doneTransactionStatus();

	    })
	
})

// 當按下提前合約按鈕時
earlyfinish.on('click', async function () {

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
	// 
	bank.methods.earlyendcont(parseInt(time2end.val(),10)).send({
		from: nowAccount,
		gas: 3400000
	})
	    .on('receipt', function (receipt) {
		log(receipt.events.EarlyendEvent.returnValues,'提前解約')
		
		update.trigger('click');
		updateCont.trigger('click');
		
		doneTransactionStatus();

	    })
	    
	    .on('error', function (error) {
		log(error.toString())
		
     	doneTransactionStatus();

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
	bank.methods.deposit().send({
		from: nowAccount,
		gas: 3400000,
		value: web3.utils.toWei(deposit.val(), 'ether')
	})
		.on('receipt', function (receipt) {
			log(receipt.events.DepositEvent.returnValues, '存款成功')

			// 觸發更新帳戶資料
			update.trigger('click')

			// 更新介面 
			doneTransactionStatus()
		})
		.on('error', function (error) {
			log(error.toString())
			// 更新介面 
			doneTransactionStatus()
		})
})

// 當按下定存按鍵時
cdepositButton.on('click', async function () {

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
	bank.methods.cdeposit(parseInt(cdepositTime.val(),10)).send({
		from: nowAccount,
		gas: 3400000,
		value: web3.utils.toWei(cdeposit.val(), 'ether')
	})
		.on('receipt', function (receipt) {
			log(receipt.events.CdepositEvent.returnValues, '定存成功')

			// 觸發更新帳戶資料
			update.trigger('click')
            updateCont.trigger('click')
            
			// 更新介面 
			doneTransactionStatus()
		})
		.on('error', function (error) {
			log(error.toString())
			// 更新介面 
			doneTransactionStatus()
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
	bank.methods.withdraw(parseInt(withdraw.val(), 10)).send({
		from: nowAccount,
		gas: 3400000
	})
		.on('receipt', function (receipt) {
			log(receipt.events.WithdrawEvent.returnValues, '提款成功')

			// 觸發更新帳戶資料
			update.trigger('click')

			// 更新介面 
			doneTransactionStatus()
		})
		.on('error', function (error) {
			log(error.toString())
			// 更新介面 
			doneTransactionStatus()
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
	bank.methods.transfer(transferEtherTo.val(), parseInt(transferEtherValue.val(), 10)).send({
		from: nowAccount,
		gas: 3400000
	})
		.on('receipt', function (receipt) {
			log(receipt.events.TransferEvent.returnValues, '轉帳成功')

			// 觸發更新帳戶資料
			update.trigger('click')

			// 更新介面 
			doneTransactionStatus()
		})
		.on('error', function (error) {
			log(error.toString())
			// 更新介面 
			doneTransactionStatus()
		})
})

// 載入bank合約
function loadBank(address) {
	if (!(address === undefined || address === null || address === '')) {

		let bank_temp = new web3.eth.Contract(bankAbi);
		bank_temp.options.address = address;

		if (bank_temp != undefined) {
			bankAddress = address;
			bank.options.address = bankAddress;

			contractAddress.text('合約位址:' + address)
			log(bank, '載入合約')

			update.trigger('click')
		}
		else {
			log(address, '載入失敗')
		}
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

	bank.deploy({
		data: bankBytecode
	})
		.send({
			from: nowAccount,
			gas: 3400000
		})
		.on('receipt', function (receipt) {
			log(receipt, '部署合約')

			// 更新合約介面
			bankAddress = receipt.contractAddress
			bank.options.address = bankAddress;
			contractAddress.text('合約位址:' + receipt.contractAddress)
			deployedContractAddressInput.val(receipt.contractAddress)

			update.trigger('click');

			// 更新介面
			doneTransactionStatus();
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
		return web3.eth.personal.unlockAccount(nowAccount, password, 60)
			.then(function (result) {
				return true;
			})
			.catch(function (err) {
				alert("密碼錯誤")
				return false;
			});
	}
}
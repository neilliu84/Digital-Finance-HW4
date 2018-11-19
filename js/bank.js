let bankBytecode ="0x608060405260008054600160a060020a033316600160a060020a03199091161790556107ae806100306000396000f3006080604052600436106100985763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632c61885e811461009d5780632e1a7d4d146100b757806341c0e1b5146100cf5780637b83b50b146100e45780637f9294191461010b578063a9059cbb14610120578063d0e30db014610144578063e9ad40c51461014c578063f1dc59e11461017a575b600080fd5b3480156100a957600080fd5b506100b5600435610185565b005b3480156100c357600080fd5b506100b560043561029c565b3480156100db57600080fd5b506100b561039e565b3480156100f057600080fd5b506100f9610412565b60408051918252519081900360200190f35b34801561011757600080fd5b506100b561042e565b34801561012c57600080fd5b506100b5600160a060020a0360043516602435610547565b6100b5610623565b34801561015857600080fd5b50610161610684565b6040805192835260208301919091528051918290030190f35b6100b560043561068e565b600154600160a060020a0333166000908152600360205260408120548211156101e6576040805160e560020a62461bcd02815260206004820152601c6024820152600080516020610763833981519152604482015290519081900360640190fd5b604051600160a060020a0333169083156108fc029084906000818181858888f1935050505015801561021c573d6000803e3d6000fd5b50600160a060020a033316600090815260036020526040902080548390039055606483830260006001819055600255604080519290910484018083524260208401528151909350600160a060020a033316927f6d3ec3168a51d7a6b61d2bce64ab0c3192f81dcb66e8037497933d6cd36b7b1c92908290030190a2505050565b600160a060020a033316600090815260036020526040902054670de0b6b3a7640000820290811115610306576040805160e560020a62461bcd02815260206004820152601c6024820152600080516020610763833981519152604482015290519081900360640190fd5b604051600160a060020a0333169082156108fc029083906000818181858888f1935050505015801561033c573d6000803e3d6000fd5b50600160a060020a033316600081815260036020908152604091829020805485900390558151858152429181019190915281517f5bb95829671915ece371da722f91d5371159095dcabf2f75cd6c53facb7e1bab929181900390910190a25050565b60005433600160a060020a03908116911614610404576040805160e560020a62461bcd02815260206004820152601160248201527f796f7520617265206e6f74206f776e6572000000000000000000000000000000604482015290519081900360640190fd5b600054600160a060020a0316ff5b600160a060020a03331660009081526003602052604090205490565b600154600160a060020a03331660009081526003602052604081205482111561048f576040805160e560020a62461bcd02815260206004820152601c6024820152600080516020610763833981519152604482015290519081900360640190fd5b604051600160a060020a0333169083156108fc029084906000818181858888f193505050501580156104c5573d6000803e3d6000fd5b50600160a060020a033316600090815260036020526040902080548390039055600254606490830260006001819055600255604080519290910484018083524260208401528151909350600160a060020a033316927f5e9dd176dd54bfedf1b164f5dcdfd5ce84a6d3bdf72ba8c4f54c02d71dc35a1f92908290030190a25050565b600160a060020a033316600090815260036020526040902054670de0b6b3a76400008202908111156105b1576040805160e560020a62461bcd02815260206004820152601c6024820152600080516020610763833981519152604482015290519081900360640190fd5b600160a060020a033381166000818152600360209081526040808320805487900390559387168083529184902080548601905583518681524291810191909152835191937fbabc8cd3bd6701ee99131f374fd2ab4ea66f48dc4e4182ed78fecb0502e44dd692918290030190a3505050565b600160a060020a0333166000818152600360209081526040918290208054349081019091558251908152429181019190915281517fad40ae5dc69974ba932d08b0a608e89109412d41d04850f5196f144875ae2660929181900390910190a2565b6001546002549091565b60015415801561069e5750600254155b15156106f4576040805160e560020a62461bcd02815260206004820152600e60248201527f636f6e7472616374206578697374000000000000000000000000000000000000604482015290519081900360640190fd5b600160a060020a033316600081815260036020908152604091829020805434908101909155600181905560028590558251908152908101849052428183015290517fc8c869a368773566e782875047cd4e455e31b868827a5153560fe9f90b0a721c9181900360600190a2505600796f75722062616c616e63657320617265206e6f7420656e6f75676800000000a165627a7a723058203b19861484d331e4430d5814dbe291da79d975349a31ce9b18540ad504fd6ade0029";
let bankAbi =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "time2end",
				"type": "uint256"
			}
		],
		"name": "earlyendcont",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "etherValue",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBankBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "cendcontract",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "etherValue",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCdeposit",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "y",
				"type": "uint256"
			}
		],
		"name": "cdeposit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "profit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "EarlyendEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "profit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "EndcontEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "money",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "CdepositEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "DepositEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "WithdrawEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "TransferEvent",
		"type": "event"
	}
];

pragma solidity ^0.4.23;

contract Bank {
	// 此合約的擁有者
    address private owner;
    uint256 private money ;
    uint256 private time ;
    

	// 儲存所有會員的餘額
    mapping (address => uint256) private balance;
   
	// 事件們，用於通知前端 web3.js
    event EarlyendEvent(address indexed from, uint profit, uint256 timestamp);
    event EndcontEvent(address indexed from, uint profit, uint256 timestamp);
    event CdepositEvent(address indexed from, uint money,uint time, uint256 timestamp);
    event DepositEvent(address indexed from, uint256 value, uint256 timestamp);
    event WithdrawEvent(address indexed from, uint256 value, uint256 timestamp);
    event TransferEvent(address indexed from, address indexed to, uint256 value, uint256 timestamp);

    modifier isOwner() {
        require(owner == msg.sender, "you are not owner");
        _;
    }
    
	// 建構子
    constructor() public payable {
        owner = msg.sender;
    }

	// 存錢
    function deposit() public payable {
        balance[msg.sender] += msg.value;

        emit DepositEvent(msg.sender, msg.value, now);
    }
    
    //定存
    function cdeposit(uint y) public payable{
        require(money ==0 && time == 0 ,"contract exist");
        balance[msg.sender] += msg.value;
        money =msg.value;
        time = y; 
        
    
        emit CdepositEvent(msg.sender,money,time, now);
    }
    //合約期滿
    function cendcontract() public  returns(uint){
        uint256 weiValue = money * 1 wei;
        
        require(balance[msg.sender] >= weiValue , "your balances are not enough");
        
        msg.sender.transfer(weiValue);
        
        balance[msg.sender] -= weiValue;
        
        uint profit = weiValue + weiValue*time/100;
        money = 0;
        time =0;
        
        return(profit);
        
        emit EndcontEvent(msg.sender,profit, now);
    }
    
    //提前解約
    function earlyendcont(uint256 time2end) public returns(uint){
        uint256 weiValue = money * 1 wei;
        
        require(balance[msg.sender] >= weiValue , "your balances are not enough");
        
        msg.sender.transfer(weiValue);
        
        balance[msg.sender] -= weiValue;
        
        uint profit = weiValue + weiValue*time2end/100;
        money = 0;
        time = 0;
        
        return(profit);
        
        emit EarlyendEvent(msg.sender, profit, now);
    }


	// 提錢
    function withdraw(uint256 etherValue) public {
        uint256 weiValue = etherValue * 1 ether;

        require(balance[msg.sender] >= weiValue, "your balances are not enough");

        msg.sender.transfer(weiValue);

        balance[msg.sender] -= weiValue;

        emit WithdrawEvent(msg.sender, etherValue, now);
        
        
    }

	// 轉帳
    function transfer(address to, uint256 etherValue) public {
        uint256 weiValue = etherValue * 1 ether;

        require(balance[msg.sender] >= weiValue, "your balances are not enough");

        balance[msg.sender] -= weiValue;
        balance[to] += weiValue;

        emit TransferEvent(msg.sender, to, etherValue, now);
    }

	// 檢查銀行帳戶餘額
    function getBankBalance() public view returns (uint256) {
        return balance[msg.sender];
    }
    //檢查定存本金及期數
    function getCdeposit() public view returns (uint,uint) {
        
        return (money,time);
    } 

    function kill() public isOwner {
        selfdestruct(owner);
    }
}
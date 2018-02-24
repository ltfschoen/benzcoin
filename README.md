# BenzCoin
==========================

![BenzCoin](https://raw.githubusercontent.com/ltfschoen/benzcoin/master/build/images/logo.png)

## What is BenzCoin?
BenzCoin will initially become a usable and transactable oil asset backed token

## Setup

* Original Setup

	* Clone the repo
		```
		git clone https://github.com/ltfschoen/benzcoin
		```

	* Install Dependencies

	  * Switch to relevant Node.js version using NVM and install dependencies	
			```
			nvm use v8.0.0
			```

	  * Install Truffle and Test Framework with Ganache CLI (Ethereum TestRPC)
	    ```
	    npm install -g truffle ganache-cli
	    ```

	* Configure Blockchain, Compile and Deploy Contract

	  * Run Ethereum Client (in separate Terminal tab)
			* Delete DB folder if starting fresh
				```
				rm -rf ./db
				```
	  	* Create DB folder
				```
				mkdir db && mkdir db/chain_database
				```
			* Start Ethereum Blockchain Protocol Node Simulation
				```
				cd /Users/Ls/code/blockchain/benzcoin;
				ganache-cli \
					--account="0x0000000000000000000000000000000000000000000000000000000000000001, 2471238800000000000" \
				  --account="0x0000000000000000000000000000000000000000000000000000000000000002, 4471238800000000000" \
				  --unlock "0x0000000000000000000000000000000000000000000000000000000000000001" \
				  --unlock "0x0000000000000000000000000000000000000000000000000000000000000002" \
				  --blocktime 0 \
				  --deterministic true \
				  --port 8500 \
				  --hostname localhost \
				  --seed 'blah' \
				  --debug true \
				  --mem true \
				  --mnemonic 'something' \
				  --db './db/chain_database' \
				  --verbose \
				  --networkId=3 \
				  --gasLimit=7984452 \
				  --gasPrice=20000000000;
				```
	  		* Served on http://localhost:8500

			* Deploy Contracts onto Network of choice (i.e. "development") defined in truffle.js

				* Compile: - http://truffleframework.com/docs/getting_started/compile
					* Compile Contract Latest - `truffle compile` (only changes since last compile)
					* Compile Contract Full - `truffle compile --compile-all` (full compile)

				* Migrate: 
					* Run Migrations Latest - `truffle migrate`
					* Run Migrations Full - `truffle migrate --reset --network development`
					* Run Contracts from specific Migration - `truffle migrate -f <number>`
					* Run Migration on specific network called 'live' defined in truffle.js - `truffle migrate --network live`

	* Build DApp Front-end and Run Node.js Server
		* Build Dapp Front-end:
			* Build Artifacts (requires Default or Custom Builder such as Webpack to be configured)
				```
				npm run build
				``` 
				(same as `truffle build`)

  	* Run Dapp Server
  		* Build App and Run Dev Server: 
  			```
  			npm run dev
  			```

  			* Open `open http://localhost:8080` in browser

  			* Screenshot:

  				![alt tag](https://raw.githubusercontent.com/ltfschoen/benzcoin/master/screenshots/gui.png)

				* Example:
					* Within browser transfer say 10 wei to Account No.  0x0000000000000000000000000000000000000000000000000000000000000001 that we created on Ethereum TestRPC

				* Check Account Balances from Terminal by loading External JavaScript file:
					```
					truffle exec './scripts/checkAllBalances.js’
					```
		
		* Watch
			* Watch for changes to contracts, app and config files. Rebuild app upon changes.
			```
			truffle watch
			```

			* Reference
				* http://truffleframework.com/docs/advanced/commands
		
		* Test: 
			```
			truffle test
			truffle test ./path/to/test/file.js
			```

		* Linter
  		* Run Linter: `npm run lint`

* Truffle Interactive Console (REPL) 
	* Run REPL on specified network and log communication between Truffle and the RPC
		```
		truffle console --network development --verbose-rpc
		```

		* Try the following commands
			```
			web3

			// Show existing BenzCoin accounts
			web3.eth.accounts

			i.e. 
				[ '0x7e5f4552091a69125d5dfcb7b8c2659029395bdf',
  				'0x2b5ad5c4795c026514f8317c7a215e218dccd6cf' ]

 			web3.eth.blockNumber
			var Web3 = require('web3');
			var web3 = new Web3.providers.HttpProvider("http://localhost:8545");
			web3.isConnected();
			var contract = require("truffle-contract");

			/*
			 * Execute Custom Contract (BenzCoin) Functions on Ethereum Network (i.e. we * previously created the following functions in BenzCoin.sol: sendCoin, 
			 * getBalanceInEth, getBalance)
			 */ 

			// Call sendCoin function to send Benz coins from one account to another. Execute as 'transaction' that persists changes to the network

			// Get reference to the 2x Ethereum Account Addresses we created on the Ethereum.js TestRPC network:
			var account_one = web3.eth.accounts[0]; // an address
			var account_two = web3.eth.accounts[1]; // another address

			// Show Account Balances 
			web3.eth.getBalance(account_one)
			web3.eth.getBalance(account_two)

			/*
			 * Call the Contract Abstraction's `sendCoin` function directly
			 * (passing a special object as the last parameter that allows Editing of
			 * specific transaction details) that results 
			 * in a 'transaction' (WRITE DATA instead of a 'call') and callback function * only fires when transaction successful
			 */
			var benz;

			// Refer to alternative better approach using `BenzCoin.at(...)`: https://github.com/trufflesuite/truffle-contract
			BenzCoin.deployed().then(function(instance) {
			  benz = instance;
			  return benz.sendCoin(account_two, 10, {from: account_one});
			}).then(function(result) {
			  // callback that when called means transaction was successfully processed
			  // Validate that triggered the Transfer event by checking logs
			  for (var i = 0; i < result.logs.length; i++) {
			    var log = result.logs[i];

			    if (log.event == "Transfer") {
			      console.log("Transaction triggered Transfer event in logs");
			      break;
			    }
			  }
			  console.log("Transaction successful with response: ", JSON.stringify(result, null, 2));
			}).catch(function(e) {
			  console.log("Error running BenzCoin.sol function sendCoin");
			})

			// IMPORTANT NOTE: COPY/PASTE BELOW INTO TRUFFLE CONSOLE (SINCE CANNOT COPY/PASTE MULTI-LINE CODE)
			var benz; BenzCoin.deployed().then(function(instance) { benz = instance; return benz.sendCoin(account_two, 10, {from: account_one}); }).then(function(result) { for (var i = 0; i < result.logs.length; i++) { var log = result.logs[i]; if (log.event == "Transfer") { console.log("Transaction triggered Transfer event in logs"); break; } }; console.log("Transaction successful with response: ", JSON.stringify(result, null, 2)); }).catch(function(e) { console.log("Error running BenzCoin.sol function sendCoin"); })

			/*
			 * Call the Contract Abstraction's `getBalance` function using 
			 * a 'call' (READ DATA instead of a 'transaction') so Ethereum network 
			 * knwos we do not intend to persist any changes, and callback function 
			 * only fires when call is successful. Instead returns a value (instead
			 * of just a Transaction ID like with 'transaction') of BenzCoin balance 
			 * as BigNumber object at address that is passed to it.
			 */
			var benz;
			BenzCoin.deployed().then(function(instance) {
			  benz = instance;
			  return benz.getBalance.call(account_one, {from: account_one});
			}).then(function(balance) {
			  // Callback is called when 'call' was successfully executed
			  // Callback returns immediately without any waiting
			  console.log("Balance is: ", balance.toNumber());
			}).catch(function(e) {
			  console.log("Error running BenzCoin.sol function getBalance");
			})

			// New Contract Abstraction deployed to Address on network
			BenzCoin.new().then(function(instance) {
			  // Print the new address
			  console.log("New Contract Abstraction deployed to network at address: ", instance.address);
			}).catch(function(err) {
				console.log("Error creating new contract abstraction: ", err);
			});

			// Existing Contract Abstraction Address - Create New Contract Abstraction using Existing Contract Address (that has already been deployed)
			var instance = BenzCoin.at("0x7e5f4552091a69125d5dfcb7b8c2659029395bdf");

			// Send Ether directly to a Contract or trigger a Contract's [Fallback function](http://solidity.readthedocs.io/en/develop/contracts.html#fallback-function)
			```
			// Send Ether / Trigger Fallback function 
			// Reference: https://github.com/ethereum/wiki/wiki/JavaScript-API#web3ethsendtransaction
			instance.sendTransaction({...}).then(function(result) {
			  // Same transaction result object as above.
			});

			// Send Ether directly to Contract using shorthand
			instance.send(web3.toWei(1, "ether")).then(function(result) {
			  // Same result object as above.
			});

	* Reference: 
		* http://truffleframework.com/docs/getting_started/console
		* https://github.com/trufflesuite/truffle-contract
		* http://truffleframework.com/docs/getting_started/contracts
		* https://github.com/ethereum/wiki/wiki/JavaScript-API
		* https://www.ethereum.org/cli

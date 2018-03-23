# Mutliblockz Api Node.js Wrapper

## Synopsis

This projects helps you to make HTTP requests to the blockchain explorer.


## Installation

```sh
npm install multiblockz-node
```

```javasctipt
var multiblockz = require('multiblockz-node');
```

```javasctipt
// Public API

var client = new multiblockz();

```

## Methods

* [status](#status)
* [api](#api)
* [history](#history)

###status
**Examples**
You can obtain summary information about all our explorers 

Request:
    /status


```javasctipt
client.status(function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);

});

```

###api
**Examples**
Request:
    /api

    param: 
    coins: string (symbol blockchain) example : ltc,btc,neo
    query: 
      addresses: returns a JSON object with the number of known and non-zero addresses (with funds)
      circulating: returns the number of circulating coins (minus reserve, Prime holdings...)
      getblockcount: returns the current block height as a plain text string
      getdifficulty: returns the difficulty as a plain text string
      hashrate: returns the hashrate in GH/s (when supported, blockchain.info API compatible)
      nethashps: returns the hashrate in H/s (when supported)
      netmhashps: returns the hashrate in MH/s (when supported)
      rich: returns the rich list top 1000 (JSON format)
      summary: returns summary information for all explorers
      ticker.btc: returns the last market ticker in BTC, as tracked by the explorer, only one market is tracked and this value can be several minutes behind the market. Use market APIs directly for more accurate quotations.
      ticker.usd: returns the last market ticker in USD, as tracked by the explorer and BitPay rate, only one market is tracked and this value can be several minutes behind the market. Use market APIs directly for more accurate quotations.
      totalbc: returns the outstanding number of coins in satoshis (x 1e8, for compatibility with blockhain.info API)
      totalcoins: returns the outstanding number of coins

```javasctipt
var coins="ltc";
var query="getdifficulty";
client.api("ltc","getdifficulty",function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);

});
```

###history
**Examples**
Request:
    /history

    param: 
    coins: string (symbol blockchain) example : ltc,btc,neo
    address: address of wallet

    query:Information about jobs
    resultat: number of resultat per page
    page : number of page

```javasctipt
client.history(coins,address,function (error, data) {
  if(error) console.log("E!",error)
  console.dir(data);

});


```


## API Reference
https://chainz.cryptoid.info/api.dws


## Contributors

Anis Haboubi

## License

See [LICENSE.txt](LICENSE.txt) for more info.
var multiblockz = require('../index.js');
// Public API

var client = new multiblockz();
// client.status(function (error, data) {
// 	if(error) console.log("E!",error)
// 	console.dir(data);

// });

client.api("ltc","getdifficulty",function (error, data) {
	if(error) console.log("E!",error)
	console.dir(data);

});
// address btc
// var address="1Hz96kJKF2HLPGY15JWLB5m9qGNxvt8tHJ";
// var coins="btc";
// client.history(coins,address,function (error, data) {
// 	if(error) console.log("E!",error)
// 	// console.dir(data);

// });
// var address="LQL9pVH1LsMfKwt82Y2wGhNGkrjF8vwUst";
// var coins="ltc";
// client.history(coins,address,function (error, data) {
// 	if(error) console.log("E!",error)
// 	console.dir(data);

// });

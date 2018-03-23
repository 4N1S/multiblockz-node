
var _ = require('underscore');
var https = require('https');
var crypto = require('crypto');
var url = require('url');
var urlencode = require('urlencode');
var cheerio = require('cheerio');


var multiblockz = function(verbose) {
	this.verbose = verbose || false;
	this.version = "0.0.1";
	this.host = "chainz.cryptoid.info";
	this.uri = "/";
	this.baseURL = "https://www.chainz.cryptoid.info/";
	this.userAgent = "multiblockz-node";
	this.headers= {
			"User-Agent": "multiblockz-node",
			"Content-Type": "application/x-www-form-urlencoded",
			'X-Requested-With': 'XMLHttpRequest'

		}
};
multiblockz.prototype.status = function(callback) {
	this.pubRequest("explorer/api.dws?q=summary", {}, function(err, data) {
		return callback(err, data);
	});
}
multiblockz.prototype.api = function(coins,query,callback) {
	this.pubRequest(coins+"/api.dws?q="+query, {}, function(err, data) {
		return callback(err, data);
	});
}
http://chainz.cryptoid.info/ric/api.dws?q=getdifficulty".


multiblockz.prototype.history = function(coins,address,callback) {
	var self=this;
	this.pubRequest(coins+"/address.dws?"+address+".json", {}, function(err, data) {
	if(data){
	setTimeout(function(){
		var data2=data;	
		self.pubRequest("explorer/address.summary.dws?coin="+data.coin+"&id="+data.id+"&r="+data.r+"", {}, function(err, data) {
			console.log("Data for blockchain "+ data2.coin + " ==> address:" + address);
			return callback(err, data);
		});
	}, 2000);
	}

	});
}

multiblockz.prototype.pubRequest = function(method, params, callback) {
	var options = {
	  hostname: this.host,
	  path: this.uri + method,
	  port: 443,
	  method: 'GET',
	  verbose: this.verbose,
	  headers:this.headers
	};

	console.log(options.path);
	cb = function(response) {
		if (response.statusCode < 200 || response.statusCode > 299) {
		   callback(response.statusCode);
		 }
		if(response.statusCode==200){

		var str = '';
		response.on('data', function (chunk) {
			str += chunk;
			if (options.verbose) console.log(str);
		});


		response.on('end', function () {
			var objFromJSON;
			const $ = cheerio.load(str);
			
			var param=$("#footer").next().next().next().next().html();
		  if(method.indexOf("json")!=0 && param){

			var refId = param.substring(param.indexOf("refId=")+6, param.indexOf("refId=")+13);
			var coinShortLow = param.substring(param.indexOf("coinShortLow=")+14, param.indexOf("coinShortLow=")+17);
			var addrID = param.substring(param.indexOf("addrID=")+7, param.indexOf("addrID=")+15);
	  	          
		  	objFromJSON={
		  		"id":addrID,
		  		"coin":coinShortLow,
		  		"r":refId
		  	};
		  	try {
		  		return callback(null, objFromJSON);
		  	}
		  	catch (err) {
		  		return callback(err, null);
		  	}

		  }else{

				try {
					objFromJSON = JSON.parse(str);
					return callback(null, objFromJSON);
				}
				catch (err) {
					return callback(err, null);
				}
			}
		});
		}
	}
	var req = https.request(options, cb);
	req.on('error', function(err) {
		callback(err.status, null);
	});

	req.end();

};

module.exports = multiblockz;

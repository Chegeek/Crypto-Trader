/// This is intended to be a JavaScript wrapper for all bittrex api calls.
jsSHA = require("jssha");

function getOrderHistory(ticker, callback){
	getSignedJSON("https://bittrex.com/api/v1.1/account/getorderhistory?market=" + ticker, secretKey, nonce, true,
		function(err,data) {
			callback(err, data);
		});
}

function getWithdrawalHistory(apiKey, secretKey, currency, callback) {
	var nonce = Math.round((new Date()).getTime() / 1000);
	getSignedJSON("https://bittrex.com/api/v1.1/account/getwithdrawalhistory?currency=" + currency + "&apikey=" + apiKey + "&nonce=" + nonce, secretKey, nonce, true,
		function(err, data) {
			callback(err, data);
		});
}

function getDepositHistory(apiKey, secretKey, currency, callback) {
	var nonce = Math.round((new Date()).getTime() / 1000);
	getSignedJSON("https://bittrex.com/api/v1.1/account/getwithdrawalhistory?currency=" + currency + "&apikey=" + apiKey + "&nonce=" + nonce, secretKey, nonce, true,
		function(err, data) {
			callback(err, data);
		});
}

function placeSellOrder(apiKey, secretKey, ticker, quantity, rate, callback) {
	var nonce = Math.round((new Date()).getTime() / 1000);
	getSignedJSON("https://bittrex.com/api/v1.1/market/selllimit?apikey=" + apiKey + "&market=" + ticker + "&quantity="+ quantity + "&rate="+ rate + "&nonce=" + nonce, secretKey, nonce, true,
		function(err, data) {
			callback(err, data);
		});
}

function placeBuyOrder(apiKey, secretKey, ticker, quantity, rate, callback) {
	var nonce = Math.round((new Date()).getTime() / 1000);
	getSignedJSON("https://bittrex.com/api/v1.1/market/buylimit?apikey=" + apiKey + "&market=" + ticker + "&quantity="+ quantity + "&rate="+ rate + "&nonce=" + nonce, secretKey, nonce, true,
		function(err, data) {
			callback(err, data);
		});
}

function getTickerBalances(apiKey, secretKey, baseCurrency, tradeCurrency, callback) {
	var nonce = Math.round((new Date()).getTime() / 1000);
	getSignedJSON("https://bittrex.com/api/v1.1/account/getbalance?apikey=" + apiKey + "&currency=" + baseCurrency + "&nonce=" + nonce, secretKey, nonce, true,
		function(err, data) {
			callback(err, data);
		});
}

function getMarketStats(ticker, callback) {
	getSignedJSON("https://bittrex.com/api/v1.1/public/getmarketsummary?market=" + ticker, "",false,
		function(err, data) {
			callback(err, data);
		});
}

function getSignedJSON(url, secretKey, nonce, isSigned, callback) {
	console.log("hi")
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	if(isSigned){
		var shaObj = new jsSHA("SHA-512", "TEXT");
		shaObj.setHMACKey(secretKey, "TEXT");
		shaObj.update(url);
		var hash = shaObj.getHMAC("HEX");
		xhr.setRequestHeader("apisign", hash);
	}
	xhr.onload = function() {
		var status = xhr.status;
		if (status == 200){
			callback(null, xhr.response);
		} else{
			callback(status);
		}
	};
	xhr.send();
}

module.exports = {
	getMarketStats: getMarketStats,
	getTickerBalances: getTickerBalances,
	placeBuyOrder: placeBuyOrder,
	placeSellOrder: placeSellOrder,
}
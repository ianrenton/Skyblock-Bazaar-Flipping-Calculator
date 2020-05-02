// Static defines
var DOMAIN = "https://api.hypixel.net";
var KEY = "INSERT YOUR KEY HERE - OBTAIN BY RUNNING THE /api COMMAND ON HYPIXEL";
var MAX_QUANTITY_PER_ORDER = 71680;

// Global data storage
var apiData = {};

// Default values
var maxOutlay = 1000000;
var maxOffers = 1;
var sortByProfitPerItem = false;
var sortByTotalProfit = true;

// Basic API request function
function request(endpoint, params, callback) {
	params["key"] = KEY;
	var url = DOMAIN + endpoint + "?" + encodeQueryData(params);
	$.getJSON(url, callback);
}

// Encode query data function
function encodeQueryData(data) {
   const ret = [];
   for (let d in data)
     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
   return ret.join('&');
}

// Main method to get product list
function getProductList() {
	request("/skyblock/bazaar", {}, async function(result) {
		// Store refresh date
		lastRefresh = new Date();
		// Unpack data
		handleData(result);
	});
}

// Callback handler for the product list
async function handleData(result) {
	if (result.success) {
		// Success, we have data! Store it for use
		apiData = result;

		// Refresh the display
		updateDisplay();
	} else {
		// Failed, request another go
		await new Promise(r => setTimeout(r, 500));
		getProductList();
	}
}

// Prettify item name function
function prettify(string) {
	var result;
	var sentence = string.toLowerCase().split("_");
	for(var i = 0; i< sentence.length; i++){
		sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
	}
	result = sentence.join(" ");
	result = result.replace(":", " : ");
	result = result.replace(" Item", "");
	return result;
}

// Main function that performs calculations and updates the display
function updateDisplay() {
	// First, set up an array to store our calculated data.
	var calcData = [];

	// Iterate over all products...
	for (id in apiData.products) {
		// Get the summaries
		var buySummary = apiData.products[id].buy_summary;
		var sellSummary = apiData.products[id].sell_summary;

		// Check for empty arrays - if yoy can't buy or sell the item then there's
		// no point including it
		if (Array.isArray(buySummary) && Array.isArray(sellSummary) && buySummary.length > 0 && sellSummary.length > 0) {
			// Find the highest buy order price and the lowest sell offer price in the
			// current order/offer lists. This is a bit back-to-front as in the API
			// data, "buySummary" shows what from the user's point of view is "sell
			// offers", whereas "sellSummary" shows "buy orders".
			var lowestSellOffer = Math.min.apply(Math, buySummary.map(function(o) { return o.pricePerUnit; }));
			var highestBuyOrder = Math.max.apply(Math, sellSummary.map(function(o) { return o.pricePerUnit; }));

			// We want to undercut the competition on both sides, so we want to put
			// in a sell offer for the current lowest sell offer minus 0.1 coins/item,
			// and put in a buy order for the current highest buy order plus 0.1.
			var item = {};
			item.id = id;
			item.name = prettify(id);
			item.sellPrice = lowestSellOffer - 0.1;
			item.buyPrice = highestBuyOrder + 0.1;
			item.profitPerItem = item.sellPrice - item.buyPrice;

			// Work out how many we can afford with our maximum outlay, and
			// the constraint of how many orders we're willing to place
			affordableQuantity = Math.floor(maxOutlay / item.buyPrice);
			item.maxQuantity = Math.min(affordableQuantity, maxOffers * MAX_QUANTITY_PER_ORDER);
			item.numOffersRequired = Math.ceil(item.maxQuantity / MAX_QUANTITY_PER_ORDER);
			item.totalProfit = (item.sellPrice - item.buyPrice) * item.maxQuantity

			// Only store the data if we can afford at least one item
			if (item.maxQuantity > 0) {
				calcData.push(item);
			}
		}
	}

	// Apply the required sort to the data
	if (sortByProfitPerItem) {
		calcData.sort((a, b) => (a.profitPerItem > b.profitPerItem) ? -1 : 1)
	} else if (sortByTotalProfit) {
		calcData.sort((a, b) => (a.totalProfit > b.totalProfit) ? -1 : 1)
	} else {
		calcData.sort((a, b) => (a.name > b.name) ? 1 : -1)
	}

	// Create table header. If maxOffers is >1, an extra column is added to show
	// the number of offers required to buy/sell that many items
	var table = $('<table>').addClass('results');
	var headerFields = "<th>Item Name</th><th>Buy Order at</th><th>Sell Offer at</th><th>Profit per Item</th><th>Quantity</th>";
	if (maxOffers > 1) {
		headerFields += "<th>Number of Offers</th>";
	}
	headerFields += "<th>Total Profit</th>";
	var header = $('<tr>').html(headerFields);

	table.append(header);

	// Create table rows
	calcData.forEach(function(item) { 
		//  If maxOffers is >1, an extra column is added to show
		// the number of offers required to buy/sell that many items
		var rowFields = "<td>" + item.name + "</td><td>" + item.buyPrice.toFixed(1) + "</td><td>" + item.sellPrice.toFixed(1) + "</td><td>" + item.profitPerItem.toFixed(1) + "</td><td>" + item.maxQuantity + "</td>";
		if (maxOffers > 1) {
			rowFields += "<td>" + item.numOffersRequired + "</td>";
		}
		rowFields += "<td>" + item.totalProfit.toFixed(0) + "</td>";
		var row = $('<tr>').html(rowFields);

		// Set class to give red background if the item gives no profit
		if (item.profit <= 0.0) {
			row.addClass("noprofit");
		}

		// Add to table
	    table.append(row);
	});

	// Update DOM
	$('#table').html(table);
}

// Run on startup:

// Bind UI inputs to set internal values and update UI
$('#maxOutlay').val(maxOutlay);
$('#maxOutlay').keyup(function() {
    maxOutlay = $( this ).val();
    updateDisplay();
});
$('#maxOffers').val(maxOffers);
$('#maxOffers').keyup(function() {
    maxOffers = $( this ).val();
    updateDisplay();
});
$('input.sortBy').on('change', function() {
	sortByProfitPerItem = $('input#sortByProfitPerItem').is(":checked");
	sortByTotalProfit = $('input#sortByTotalProfit').is(":checked");
	updateDisplay();
});

// Get the data from the Skyblock API
getProductList();

// Static defines
var DOMAIN = "https://api.hypixel.net/";
var ITEM_NAMES_LOOKUP = new Map();
var ITEM_CUSTOM_LIMIT = new Map();

// Global data storage
var bazaarData = {};
var itemData = {};

// Default values
var maxOutlay = Number.parseInt(localStorage.getItem("maxOutlay")) || 1000000;
var useOfferLimit = localStorage.getItem("useOfferLimit") === 'true';
var maxOffers = Number.parseInt(localStorage.getItem("maxOffers")) || 1;
var useQuantityLimit = localStorage.getItem("useQuantityLimit") === 'true';
var maxQuantity = Number.parseInt(localStorage.getItem("maxQuantity")) || 20;
var useBacklogLimit = !(localStorage.getItem("useBacklogLimit") === 'false');
var maxBacklog = Number.parseFloat(localStorage.getItem("maxBacklog")) || 7;
var includeEnchantments = localStorage.getItem("includeEnchantments") === 'true';
var includeSaleToNPCs = !(localStorage.getItem("includeSaleToNPCs") === 'false');
var removeManipulated = !(localStorage.getItem("removeManipulated") === 'false');
var npcOnlyFilter = localStorage.getItem("npcOnlyFilter") === "true";
var sortBySalesBacklog = false;
var sortByProfitPerItem = false;
var sortByTotalProfit = true;

// Item name lookups for certain items where just transforming the name
// to sentence case isn't enough
ITEM_NAMES_LOOKUP.set('ENCHANTED_CARROT_STICK', 'Enchanted Carrot on a Stick');
ITEM_NAMES_LOOKUP.set('HUGE_MUSHROOM_1', 'Brown Mushroom Block');
ITEM_NAMES_LOOKUP.set('HUGE_MUSHROOM_2', 'Red Mushroom Block');
ITEM_NAMES_LOOKUP.set('ENCHANTED_HUGE_MUSHROOM_1', 'Enchanted Brown Mushroom Block');
ITEM_NAMES_LOOKUP.set('ENCHANTED_HUGE_MUSHROOM_2', 'Enchanted Red Mushroom Block');
ITEM_NAMES_LOOKUP.set('SULPHUR', 'Gunpowder');
ITEM_NAMES_LOOKUP.set('RABBIT', 'Raw Rabbit');
ITEM_NAMES_LOOKUP.set('RABBIT_FOOT', "Rabbit's Foot");
ITEM_NAMES_LOOKUP.set('ENCHANTED_RABBIT', 'Enchanted Raw Rabbit');
ITEM_NAMES_LOOKUP.set('RAW_FISH:1', 'Raw Salmon');
ITEM_NAMES_LOOKUP.set('RAW_FISH:2', 'Clownfish');
ITEM_NAMES_LOOKUP.set('RAW_FISH:3', 'Pufferfish');
ITEM_NAMES_LOOKUP.set('INK_SACK:3', 'Cocoa Beans');
ITEM_NAMES_LOOKUP.set('INK_SACK:4', 'Lapis Lazuli');
ITEM_NAMES_LOOKUP.set('LOG', 'Oak Log');
ITEM_NAMES_LOOKUP.set('LOG:1', 'Spruce Log');
ITEM_NAMES_LOOKUP.set('LOG:2', 'Birch Log');
ITEM_NAMES_LOOKUP.set('LOG_2:1', 'Dark Oak Log');
ITEM_NAMES_LOOKUP.set('LOG_2', 'Acacia Log');
ITEM_NAMES_LOOKUP.set('LOG:3', 'Jungle Log');
ITEM_NAMES_LOOKUP.set("FUEL_TANK", "Fuel Canister");
ITEM_NAMES_LOOKUP.set("TIGHTLY_TIED_HAY_BALE", "Tightly-Tied Hay Bale");
ITEM_NAMES_LOOKUP.set("GLOWSTONE_DUST_DISTILLATE", "Glowstone Distillate");
ITEM_NAMES_LOOKUP.set("MAGMA_FISH_SILVER" , "Silver Magmafish");
ITEM_NAMES_LOOKUP.set("MUTANT_NETHER_STALK", "Mutant Nether Wart");
ITEM_NAMES_LOOKUP.set("CORRUPTED_NETHER_STAR", "Nether Star");
ITEM_NAMES_LOOKUP.set("ENCHANTED_INK_SACK", "Enchanted Ink Sac");
ITEM_NAMES_LOOKUP.set("DRILL_ENGINE", "Drill Motor");

// Custom limits for some items with a different buy limit to usual
ITEM_CUSTOM_LIMIT.set('BOOSTER_COOKIE',128);
ITEM_CUSTOM_LIMIT.set('HOT_POTATO_BOOK',256);
ITEM_CUSTOM_LIMIT.set('FUMING_POTATO_BOOK',256);
ITEM_CUSTOM_LIMIT.set('COMPACTOR',256);
ITEM_CUSTOM_LIMIT.set('DWARVEN_COMPACTOR',256);
ITEM_CUSTOM_LIMIT.set('SUPER_COMPACTOR_3000',256);
ITEM_CUSTOM_LIMIT.set('SUMMONING_EYE',256);
ITEM_CUSTOM_LIMIT.set('MAGMA_BUCKET',256);
ITEM_CUSTOM_LIMIT.set('PLASMA_BUCKET',256);
ITEM_CUSTOM_LIMIT.set('RECOMBOBULATOR_3000',256);
ITEM_CUSTOM_LIMIT.set('HARDENED_WOOD',256);
ITEM_CUSTOM_LIMIT.set('ROCK_GEMSTONE',256);
ITEM_CUSTOM_LIMIT.set('RARE_DIAMOND',256);
ITEM_CUSTOM_LIMIT.set('JERRY_STONE',256);
ITEM_CUSTOM_LIMIT.set('RED_NOSE',256);
ITEM_CUSTOM_LIMIT.set('SHINY_PRISM',256);
ITEM_CUSTOM_LIMIT.set('SPIRIT_DECOY',256);
ITEM_CUSTOM_LIMIT.set('CANDY_CORN',256);
ITEM_CUSTOM_LIMIT.set('SEARINHG_STONE',256);
ITEM_CUSTOM_LIMIT.set('LAPIS_CRYSTAL',256);
ITEM_CUSTOM_LIMIT.set('RED_SCARF',256);
ITEM_CUSTOM_LIMIT.set('OPTICAL_LENS',256);
ITEM_CUSTOM_LIMIT.set('AOTE_STONE',256);
ITEM_CUSTOM_LIMIT.set('JADERALD',256);
ITEM_CUSTOM_LIMIT.set('DRAGON_CLAW',256);
ITEM_CUSTOM_LIMIT.set('BLAZE_WAX',256);
ITEM_CUSTOM_LIMIT.set('NECROMANCER_BROOCH',256);
ITEM_CUSTOM_LIMIT.set('SALMON_OPAL',256);
ITEM_CUSTOM_LIMIT.set('PREMIUM_FLESH',256);
ITEM_CUSTOM_LIMIT.set('SUSPICIOUS_VIAL',256);
ITEM_CUSTOM_LIMIT.set('METEOR_SHARD',256);
ITEM_CUSTOM_LIMIT.set('MIDAS_JEWEL',256);
ITEM_CUSTOM_LIMIT.set('DIAMOND_ATOM',256);
ITEM_CUSTOM_LIMIT.set('ONYX',256);
ITEM_CUSTOM_LIMIT.set('ENDSTONE_GEODE',256);
ITEM_CUSTOM_LIMIT.set('MOLTEN_CUBE',256);
ITEM_CUSTOM_LIMIT.set('DIAMONITE',256);
ITEM_CUSTOM_LIMIT.set('DRAGON_SCALE',256);
ITEM_CUSTOM_LIMIT.set('PURE_MITHRIL',256);
ITEM_CUSTOM_LIMIT.set('AMBER_MATERIAL',256);
ITEM_CUSTOM_LIMIT.set('PRECURSOR_GEAR',256);
ITEM_CUSTOM_LIMIT.set('WITHER_BLOOD',256);
ITEM_CUSTOM_LIMIT.set('DEEP_SEA_ORB',256);
ITEM_CUSTOM_LIMIT.set('BULKY_STONE',256);
ITEM_CUSTOM_LIMIT.set('KUUDRA_MANDIBLE',256);
ITEM_CUSTOM_LIMIT.set('SADAN_BROOCH',256);
ITEM_CUSTOM_LIMIT.set('BLESSED_FRUIT',256);
ITEM_CUSTOM_LIMIT.set('PETRIFIED_STARFALL',256);
ITEM_CUSTOM_LIMIT.set('GIANT_TOOTH',256);
ITEM_CUSTOM_LIMIT.set('DRAGON_HORN',256);
ITEM_CUSTOM_LIMIT.set('REFINED_AMBER',256);
ITEM_CUSTOM_LIMIT.set('LUCKY_DICE',256);
ITEM_CUSTOM_LIMIT.set('GOLDEN_BALL',256);
ITEM_CUSTOM_LIMIT.set('HOT_STUFF',256);
ITEM_CUSTOM_LIMIT.set('LUXURIOUS_SPOOL',256);
ITEM_CUSTOM_LIMIT.set('ROCK_CANDY',256);
ITEM_CUSTOM_LIMIT.set('END_STONE_SHULKER',256);
ITEM_CUSTOM_LIMIT.set('OBSIDIAN_TABLET',256);
ITEM_CUSTOM_LIMIT.set('DARK_ORB',256);
ITEM_CUSTOM_LIMIT.set('FURBALL',256);
ITEM_CUSTOM_LIMIT.set('ENDER_MONOCLE',256);
ITEM_CUSTOM_LIMIT.set('ACACIA_BIRDHOUSE',256);
ITEM_CUSTOM_LIMIT.set('BEATING_HEART',256);
ITEM_CUSTOM_LIMIT.set('MANDRAA',256);
ITEM_CUSTOM_LIMIT.set('MAGMA_URCHIN',256);
ITEM_CUSTOM_LIMIT.set('HORNS_OF_TORMENT',256);
ITEM_CUSTOM_LIMIT.set('PRECIOUS_PEARL',256);
ITEM_CUSTOM_LIMIT.set('ECCENTRIC_PAINTING',256);
ITEM_CUSTOM_LIMIT.set('HAZMAT_ENDERMAN',256);
ITEM_CUSTOM_LIMIT.set('VITAMIN_DEATH',256);
ITEM_CUSTOM_LIMIT.set('SCORCHED_BOOKS',256);
ITEM_CUSTOM_LIMIT.set('JUNGLE_HEART',256);
ITEM_CUSTOM_LIMIT.set('ENDERMAN_CORTEX_REWRITER',256);




// Basic API request function
function request(endpoint, params, callback) {
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

// Main method to get bazaar product list
function getBazaarProductList() {
    request("v2/skyblock/bazaar", {}, async function(result) {
        // Store refresh date
        lastRefresh = new Date();
        // Unpack data
        handleBazaarData(result);
    });
}

// Callback handler for the bazaar product list
async function handleBazaarData(result) {
    if (result.success) {
        // Success, we have data! Store it for use
        bazaarData = result;

        // Refresh the display, if we already have item data ready to go
        if (Object.keys(bazaarData).length > 0) {
            updateDisplay();
        }
    } else {
        // Failed, request another go
        await new Promise(r => setTimeout(r, 500));
        getBazaarProductList();
    }
}

// Main method to get the general item list
function getItemList() {
    request("v2/resources/skyblock/items", {}, async function(result) {
        // Unpack data
        handleItemData(result);
    });
}

// Callback handler for the general item list
async function handleItemData(result) {
    if (result.success) {
        // Success, we have data! Store it for use
        itemData = result;

        // Refresh the display, if we already have bazaar data ready to go
        if (Object.keys(bazaarData).length > 0) {
            updateDisplay();
        }
    } else {
        // Failed, request another go
        await new Promise(r => setTimeout(r, 500));
        getItemList();
    }
}

// Prettify item name function. Either looks up the definition in the list
// if available, or else just sentence cases the name.
function prettify(string) {
    var result;
    if (ITEM_NAMES_LOOKUP.has(string)) {
        result = ITEM_NAMES_LOOKUP.get(string);
    } else {
        var sentence = string.toLowerCase().split("_");
        for(var i = 0; i< sentence.length; i++){
            sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
        }
        result = sentence.join(" ");
        result = result.replace(":", " : ");
        result = result.replace(" Item", "");
    }
    return result;
}

// Calculate the buy limit per order, in units, for the provided item name.
function itemLimit(id){
    if (ITEM_CUSTOM_LIMIT.has(id)) {
        return ITEM_CUSTOM_LIMIT.get(id);
    } else {
        return 71680;
    }
}

// Calculate whether the price of an item seems like it's artificially manipulated.
function isLikelyManipulated(buy, sell) {
    return sell > buy + buy * ((100 / (buy + 12)) + 0.2)
}


// Main function that performs calculations and updates the display
function updateDisplay() {
    // First, set up a list to store our calculated data that will
    // appear in the table
    var calcData = [];
    // And lists to store reasons why items were missed from the table and other metadata
    var notProfitable = [];
    var notAffordable = [];
    var notSellable = [];
    var excludedEnchantments = [];
    var likelyManipulated = [];
    var cheaperToNPC = [];

    // Before we work on the bazaar products, turn the "items" API call result into a simple map of
    // item key => NPC buy price, if one is present. This will avoid us having to iterate through
    // it every time we want to check the price we could sell an item to NPCs at.
    var npcSellPrices = new Map();
    for (id in itemData.items) {
        if (Object.hasOwn(itemData.items[id], "npc_sell_price")) {
            npcSellPrices.set(itemData.items[id].id, itemData.items[id].npc_sell_price);
        }
    }

    // Now the real work of going through all the bazaar products. Iterate over the data...
    for (id in bazaarData.products) {
        // Get the summaries
        var buySummary = bazaarData.products[id].buy_summary;
        var sellSummary = bazaarData.products[id].sell_summary;

        // Check for empty arrays - if you can't buy or sell the item then there's
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

            // Interject here if we are able to sell this to an NPC for as much or more than we would get on the bazaar
            if (includeSaleToNPCs && npcSellPrices.has(id) && item.sellPrice <= npcSellPrices.get(id)) {
                item.sellPrice = npcSellPrices.get(id);
                cheaperToNPC.push(item);
            }

            item.buyPrice = highestBuyOrder + 0.1;
            item.profitPerItem = item.sellPrice - item.buyPrice;

            // Calculate the sales backlog - how many days' worth of sell orders are
            // already on the marketplace - higher backlogs = higher chance you'll be
            // stuck with the items longer before you can sell them.
            sellVolume = bazaarData.products[id].quick_status.sellVolume;
            sellMovingWeek = bazaarData.products[id].quick_status.sellMovingWeek;
            item.salesBacklog = sellVolume / (sellMovingWeek / 7.0);

            // Work out how many we can afford with our maximum outlay, and
            // the constraint of how many orders we're willing to place
            affordableQuantity = Math.floor(maxOutlay / item.buyPrice);

            // Constrain how many we can order based on our offer limit and/or total quantity limit
            item.maxQuantityPerOrder = itemLimit(id);
            item.maxQuantity = affordableQuantity;
            if (useOfferLimit) {
                item.maxQuantity = Math.min(item.maxQuantity, maxOffers * item.maxQuantityPerOrder);
            }
            if (useQuantityLimit) {
                item.maxQuantity = Math.min(item.maxQuantity, maxQuantity)
            }
            item.numOffersRequired = Math.ceil(item.maxQuantity / item.maxQuantityPerOrder);
            if (item.maxQuantity >= item.maxQuantityPerOrder) {
                item.numOffersRequiredText = item.numOffersRequired + " of " + item.maxQuantityPerOrder;
                if (item.maxQuantity % item.maxQuantityPerOrder != 0) {
                    item.numOffersRequiredText += "<br/>+ 1 of " + (item.maxQuantity % item.maxQuantityPerOrder);
                }
            } else {
                item.numOffersRequiredText = item.numOffersRequired + " of " + item.maxQuantity;
            }

            // Calculate total profit based on the number of items we can actually buy due to our criteria
            // and available cash
            item.totalProfit = (item.sellPrice - item.buyPrice) * item.maxQuantity

            // Only store the data if the item is profitable, and we can afford at
            // least one item, and the sales backlog is below our threshold, etc. Otherwise
            // add the name of the item to a separate list so we can note at the bottom
            // of the table why it's not being displayed.
            if (!includeEnchantments && item.name.startsWith("Enchantment ")) {
                excludedEnchantments.push(item);
            } else if (item.profitPerItem < 0.1) {
                notProfitable.push(item);
            } else if (item.maxQuantity <= 0) {
                notAffordable.push(item);
            } else if ((useBacklogLimit && item.salesBacklog > maxBacklog) && !cheaperToNPC.includes(item)) {
                notSellable.push(item);
            } else if (isLikelyManipulated(highestBuyOrder, lowestSellOffer) && removeManipulated) {
                likelyManipulated.push(item);
            } else if (npcOnlyFilter == false || item.sellPrice == npcSellPrices.get(id))
            {
              calcData.push(item);
            }
        }
    }

    // Apply the required sort to the data
    if (sortBySalesBacklog) {
        calcData.sort((a, b) => (a.salesBacklog > b.salesBacklog) ? 1 : -1);
    } else if (sortByProfitPerItem) {
        calcData.sort((a, b) => (a.profitPerItem > b.profitPerItem) ? -1 : 1);
    } else if (sortByTotalProfit) {
        calcData.sort((a, b) => (a.totalProfit > b.totalProfit) ? -1 : 1);
    } else {
        calcData.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }

    // Create table header. If maxOffers is >1, an extra column is added to show
    // the number of offers required to buy/sell that many items
    var table = $('<table>').addClass('results');
    var headerFields = "<th>Item Name</th>"
    headerFields += "<th><div class='tooltipparent'>Sales Backlog<div class='tooltip'>Sales Backlog is the number of items currently for sale, divided by the number of daily sales, averaged over a week. It is a measure, in days, of how long on average you might expect your sale offer to be fulfilled. Higher numbers represent greater risk that you will spend many days owning the items, unable to sell them.</div></div></th>"
    headerFields += "<th><div class='tooltipparent'>Buy Order at<div class='tooltip'>'Buy Order at' shows the price (per item) you should submit a Buy Order at. This is 0.1 coins higher than the current highest-priced Buy Order, offering more than the competition in the hope of a quick buy.</div></div></th>"
    headerFields += "<th><div class='tooltipparent'>Sell Offer at<div class='tooltip'>'Sell Offer at' shows the price (per item) you should submit a Sell Offer at. This is 0.1 coins lower than the current lowest Sell Offer, undercutting the comptetition in the hope of a quick sale. If '(to NPC)' is shown, you can make more money selling this item to an NPC than selling on the Bazaar.</div></div></th>"
    headerFields += "<th><div class='tooltipparent'>Profit per Item<div class='tooltip'>'Profit per item' is the sell offer price &minus; the buy order price.</div></div></th>"
    headerFields += "<th><div class='tooltipparent'>Quantity<div class='tooltip'>'Quantity' shows the number of these items you can 'flip', based on the money you have available and the maximum number of orders you want to make.</div></div></th>";
    if (maxOffers > 1 || !useOfferLimit) {
        headerFields += "<th><div class='tooltipparent'>Offer Breakdown<div class='tooltip'>'Offer breakdown' shows how many maximum-number orders you need to make, plus how many extra leftover items you need to order in the last order.</div></div></th>";
    }
    headerFields += "<th><div class='tooltipparent'>Total Profit<div class='tooltip'>'Total profit' shows how much money you should make by flipping the stated quantity of this item.</div></div></th>";
    var header = $('<tr>').html(headerFields);

    table.append(header);

    // Create table rows
    calcData.forEach(function(item) {
        //  If maxOffers is >1, an extra column is added to show
        // the number of offers required to buy/sell that many items
        var rowFields = "<td>" + item.name + "</td><td>" + (cheaperToNPC.includes(item) ? "N/A" : item.salesBacklog.toFixed(1)) + "</td><td>" + item.buyPrice.toFixed(1) + "</td><td>" + (cheaperToNPC.includes(item) ? item.sellPrice.toFixed(0) + " (to NPC)" : item.sellPrice.toFixed(1)) + "</td><td>" + item.profitPerItem.toFixed(1) + "</td><td>" + item.maxQuantity + "</td>";
        if (maxOffers > 1 || !useOfferLimit) {
            rowFields += "<td>" + item.numOffersRequiredText + "</td>";
        }
        rowFields += "<td>" + item.totalProfit.toFixed(0) + "</td>";
        var row = $('<tr>').html(rowFields);

        // Add to table
        table.append(row);
    });

    // Update DOM
    $('#table').html(table);

    // Create explanation of missing items
    var missingItemExplanation1 = '';
    var missingItemExplanation2 = '';
    var missingItemExplanation3 = '';
    var missingItemExplanation4 = '';
    var missingItemExplanation5 = '';
    var textToHide1 = document.getElementById("button1");
    var textToHide2 = document.getElementById("button2");
    var textToHide3 = document.getElementById("button3");
    var textToHide4 = document.getElementById("button4");
    var textToHide5 = document.getElementById("button5");

    if (notProfitable.length > 0) {
        textToHide1.classList.remove("hidden");
        textToHide1.classList.add("shown");
        notProfitable.sort((a, b) => (a.profitPerItem > b.profitPerItem) ? -1 : 1);
        missingItemExplanation1 += notProfitable.map(function(o) { return (o.name + ' (' + Math.abs(o.profitPerItem).toFixed(1) + ' loss)'); }).join(', ');
    }
    else {
        textToHide1.classList.remove("shown");
        textToHide1.classList.add("hidden");
    }
    if (notAffordable.length > 0) {
        textToHide2.classList.remove("hidden");
        textToHide2.classList.add("shown");
        notAffordable.sort((a, b) => (a.buyPrice > b.buyPrice) ? -1 : 1);
        missingItemExplanation2 += notAffordable.map(function(o) { return (o.name + ' (' + o.buyPrice.toFixed(1) + ' per item)'); }).join(', ');
    }
    else {
        textToHide2.classList.remove("shown");
        textToHide2.classList.add("hidden");
    }
    if (notSellable.length > 0) {
        textToHide3.classList.remove("hidden");
        textToHide3.classList.add("shown");
        notSellable.sort((a, b) => (a.salesBacklog > b.salesBacklog) ? -1 : 1);
        missingItemExplanation3 += notSellable.map(function(o) { return (o.name + ' (' + o.salesBacklog.toFixed(1) + ' days)'); }).join(', ');
    }
    else {
        textToHide3.classList.remove("shown");
        textToHide3.classList.add("hidden");
    }
    if (excludedEnchantments.length > 0) {
        textToHide4.classList.remove("hidden");
        textToHide4.classList.add("shown");
        excludedEnchantments.sort((a, b) => (a.name < b.name) ? -1 : 1);
        missingItemExplanation4 += excludedEnchantments.map(function(o) { return (o.name); }).join(', ');
    }
    else {
        textToHide4.classList.remove("shown");
        textToHide4.classList.add("hidden");
    }
    if (likelyManipulated.length > 0) {
        textToHide5.classList.remove("hidden");
        textToHide5.classList.add("shown");
        likelyManipulated.sort((a, b) => (a.name < b.name) ? -1 : 1);
        missingItemExplanation5 += likelyManipulated.map(function(o) { return (o.name); }).join(', ');
    }
    else {
        textToHide5.classList.remove("shown");
        textToHide5.classList.add("hidden");
    }

    $('#missingItemExplanation1').html(missingItemExplanation1);
    $('#missingItemExplanation2').html(missingItemExplanation2);
    $('#missingItemExplanation3').html(missingItemExplanation3);
    $('#missingItemExplanation4').html(missingItemExplanation4);
    $('#missingItemExplanation5').html(missingItemExplanation5);

}

// Run on startup:

// Event handler for collapsible text
document.addEventListener("DOMContentLoaded", function() {
    const collapsibleContainers = document.querySelectorAll(".collapsible-container");

    collapsibleContainers.forEach(function(container) {
        let buttonUsed = false;
        const collapsibleBtn = container.querySelector(".collapsible-btn");
        const collapsibleContent = container.querySelector(".content");
        const rightArrow = collapsibleBtn.querySelector(".arrow-right");
        const downArrow = collapsibleBtn.querySelector(".arrow-down");

        collapsibleBtn.addEventListener("click", function() {
            if (!buttonUsed) {
            collapsibleContent.style.display = "none";
            buttonUsed = true;
            }

            // Toggle the visibility of the content
            collapsibleContent.style.display =
            collapsibleContent.style.display === "none" ? "block" : "none";

            if (collapsibleContent.style.display === "none") {
            downArrow.style.display = "none";
            rightArrow.style.display = "block";
            } else {
            rightArrow.style.display = "none";
            downArrow.style.display = "block";
            }
        });
    });
});

// Bind UI inputs to set internal values and update UI
$('#maxOutlay').val(maxOutlay);
$('#maxOutlay').keyup(function() {
    maxOutlay = $( this ).val();
    localStorage.setItem("maxOutlay", maxOutlay);
    updateDisplay();
});
$('input#useOfferLimit').prop('checked', useOfferLimit);
$('input#useOfferLimit').on('change', function() {
    useOfferLimit = $('input#useOfferLimit').is(":checked");
    localStorage.setItem("useOfferLimit", useOfferLimit);
    updateDisplay();
});
$('#maxOffers').val(maxOffers);
$('#maxOffers').keyup(function() {
    maxOffers = $( this ).val();
    localStorage.setItem("maxOffers", maxOffers);
    updateDisplay();
});
$('input#useQuantityLimit').prop('checked', useQuantityLimit);
$('input#useQuantityLimit').on('change', function() {
    useQuantityLimit = $('input#useQuantityLimit').is(":checked");
    localStorage.setItem("useQuantityLimit", useQuantityLimit);
    updateDisplay();
});
$('#maxQuantity').val(maxQuantity);
$('#maxQuantity').keyup(function() {
    maxQuantity = $( this ).val();
    localStorage.setItem("maxQuantity", maxQuantity);
    updateDisplay();
});
$('input#useBacklogLimit').prop('checked', useBacklogLimit);
$('input#useBacklogLimit').on('change', function() {
    useBacklogLimit = $('input#useBacklogLimit').is(":checked");
    localStorage.setItem("useBacklogLimit", useBacklogLimit);
    updateDisplay();
});
$('#maxBacklog').val(maxBacklog);
$('#maxBacklog').keyup(function() {
    maxBacklog = $( this ).val();
    localStorage.setItem("maxBacklog", maxBacklog);
    updateDisplay();
});
$('input.sortBy').on('change', function() {
    sortBySalesBacklog = $('input#sortBySalesBacklog').is(":checked");
    sortByProfitPerItem = $('input#sortByProfitPerItem').is(":checked");
    sortByTotalProfit = $('input#sortByTotalProfit').is(":checked");
    updateDisplay();
});
$('input#includeEnchantments').prop('checked', includeEnchantments);
$('input#includeEnchantments').on('change', function() {
    includeEnchantments = $('input#includeEnchantments').is(":checked");
    localStorage.setItem("includeEnchantments", includeEnchantments);
    updateDisplay();
});
$('input#includeSaleToNPCs').prop('checked', includeSaleToNPCs);
$('input#includeSaleToNPCs').on('change', function() {
    includeSaleToNPCs = $('input#includeSaleToNPCs').is(":checked");
    localStorage.setItem("includeSaleToNPCs", includeSaleToNPCs);
    updateDisplay();
});
$('input#removeManipulated').prop('checked', removeManipulated);
$('input#removeManipulated').on('change', function() {
    removeManipulated = $('input#removeManipulated').is(":checked");
    localStorage.setItem("removeManipulated", removeManipulated);
    updateDisplay();
});
$("input#npcOnlyFilter").prop("checked", npcOnlyFilter);
$("input#npcOnlyFilter").on("change", function () {
    npcOnlyFilter = $("input#npcOnlyFilter").is(":checked");
    localStorage.setItem("npcOnlyFilter", npcOnlyFilter);
    // automatically check the include sale to npcs box if the npc only filter is enabled
    if (npcOnlyFilter) {
        $("input#includeSaleToNPCs").prop("checked", true).prop("disabled", true);
        includeSaleToNPCs = true;
        localStorage.setItem("includeSaleToNPCs", includeSaleToNPCs);
    }else {
        $("input#includeSaleToNPCs").prop("disabled", false);
    }

    updateDisplay();
});
$("input#showOptions").click(function() {
    $("#options").slideToggle("slow");
});

// Get the data from the Skyblock API
getBazaarProductList();
getItemList();

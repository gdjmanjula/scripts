function getHotelGA() {
    switch (document.domain) {
        case 'ocallaghanmontclare.visrez.com':
            return 'UA-24701501-1';
            break;
        case 'ocallaghandavenport.visrez.com':
            return 'UA-25230058-1'; 
            break;
        case 'ocallaghanalexander.visrez.com':
            return 'UA-25532970-1';
            break;
        case 'ocallaghanstephensgreen.visrez.com':
            return 'UA-25232614-1';
            break;
        default:
            return '';
    }
}

function getHotelName() {
    switch (document.domain) {
        case 'ocallaghanmontclare.visrez.com':
            return 'Mont Clare Hotel';
            break;
        case 'ocallaghandavenport.visrez.com':
            return 'Davenport Hotel'; 
            break;
        case 'ocallaghanalexander.visrez.com':
            return 'Alexander Hotel';
            break;
        case 'ocallaghanstephensgreen.visrez.com':
            return 'Stephens Green Hotel';
            break;
        default:
            return '';
    }
}

var _gaq = _gaq || [];
	_gaq.push(['_setAccount', getHotelGA()]); // Google account ID
	_gaq.push(['_setDomainName', 'none']); // "none" to record whatever domain is now
	_gaq.push(['_setAllowLinker', true]); // Links between domains
	_gaq.push(['_setAllowHash', false]); // Disable domain hash for cross-domain tracking
	_gaq.push(['_setAllowAnchor', true]); // Allow pound sign in URLs for query params
	_gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

function trim(string) {
	return string.replace(/(^\s+)|(\s+$)/g, "");
}
  
/*
	Developed by Robert Nyman, http://www.robertnyman.com
	Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/	
var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
 				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};  

runScript();

// Start listening to AJAX events generated by prototype.js
function runScript() {
if (Ajax.Responders) {
	Ajax.Responders.register ({
		// In the event of successful AJAX call...
		onComplete: function (response) {
			//console.log('[DEBUG] AJAX Response URL: ' + response.url);
			_gaq.push(['_trackPageview', response.url]);
			
			// Check if URL matches 1st page of booking process: room search
			if (response.url.split("?")[0] == "/reservations/search") {
				//console.log("[DEBUG] URL matches /reservations/search");
				opt_labels = {};
				// Parse URL query parameters into opt_labels as key-value pairs
				response.url.replace(
					new RegExp("([^?=&]+)(=([^&]*))?", "g"),
					function($0, $1, $2, $3) { opt_labels[$1] = $3; }
				);
				
				// If date query parameter set, track event
				if (opt_labels["date"] != "") {
					_gaq.push(["_trackEvent", "Search", "Date", opt_labels["date"]]);
					//console.log("[DEBUG] Track event - Search - Date");
				}
			
				// If nights query parameter set, track event
				if (opt_labels["nights"] != "") {
					_gaq.push(["_trackEvent", "Search", "Nights", opt_labels["nights"]]);
					//console.log("[DEBUG] Track event - Search - Nights");
				}
			
				// If number of guests query parameter set, track event
				if (opt_labels["adults"] != "") {
					_gaq.push(["_trackEvent", "Search", "Guests", opt_labels["adults"]]);
					//console.log("[DEBUG] Track event - Search - Guests");
				}
			
				// If promo code query parameter set, track event
				if (opt_labels["promo_code"] != "") {
					_gaq.push(["_trackEvent", "Search", "Promo Code", opt_labels["promo_code"]]);
					//console.log("[DEBUG] Track event - Search - Promo code");
				}
			} // End if for Search step

			// Check if URL matches second step in booking: choosing packages
			if (response.url.split("?")[0] == "/reservations/update_packages") {
				//console.log("[DEBUG] URL matches /reservations/update_packages");
				opt_labels = {};
				// Parse URL query parameters into opt_labels as key-value pairs
				response.url.replace(
					new RegExp("([^?=&]+)(=([^&]*))?", "g"),
					function($0, $1, $2, $3) { opt_labels[$1] = $3; }
				);
				
				// If quantity is > 0, track event "Add package" with package code
				if ((parseInt(opt_labels["quantity"]) > 0) && (opt_labels["code"] != "")) {
					_gaq.push(["_trackEvent", "Package", "Add", opt_labels["code"]]);
					//console.log("[DEBUG] Track event - Package - Add");
				}
			
				// If quantity = 0, package is removed - track event "Remove package"
				if ((opt_labels["quantity"] == "0") && (opt_labels["code"] != "")) {
					_gaq.push(["_trackEvent", "Package", "Remove", opt_labels["code"]]);
					//console.log("[DEBUG] Track event - Package - Remove");
				}
			}			
			
			// No query parameters here as it's a POST event. Successful booking.
			if (response.url == '/reservations') {
			
				//console.log('[DEBUG] Response URL is reservations, proceeding.');

				// Check if reservation was successful
				var checkSuccess = false;
				//console.log('[DEBUG] Start checking booking confirmation.');
				var testBookSuccess = document.getElementsByTagName('h3');
				// Check if phrase "Booking Confirmation" present in any of table lines
				for (var i = 0; i < testBookSuccess.length; i++) {
					if (trim(testBookSuccess[i].textContent) == 'Booking Confirmation') {
						checkSuccess = true;
						//console.log('[DEBUG] Booking Confirmation found!')
					}
				}
				//console.log('[DEBUG] Out of booking confirmation check.');
				
				if (checkSuccess) {
				//console.log('[DEBUG] checkSuccess is true! Start generating ecommerce code.');
				// Start generating ecommerce code
				
				// Get total price from "step4-table1-tf5" table row in "summary" div
				// Change row name as appropriate to table structure
				var xx = document.getElementsByClassName('step4-table1-tf5', 'td', document.getElementById('summary'));
				var gaTotal = xx[0].textContent.replace(/[^a-zA-Z 0-9 .]+/g,'');
				//console.log('[DEBUG] Total: ' + gaTotal);
				
				// Get Order ID from "step4-table0-td1" table row in "summary" div
				// Change row name as appropriate to table structure
				var xx = document.getElementsByClassName('step4-table0-td1', 'td', document.getElementById('summary'));
				// Order ID string should start with "Ref#:"
				for (var i = 0; i < xx.length; i++) {
					if ((xx[i].textContent.indexOf("Ref#:") != -1) && (gaOrderId == null)) {
						var xxxx = xx[i].textContent.split('Ref#:');
						var gaOrderId = xxxx[xxxx.length - 1];
						//console.log('[DEBUG] Order ID: ' + gaOrderId);
					}
				}
				
				// Generate and run addTrans code
				
				_gaq.push(['_addTrans',
					gaOrderId,          // order ID - required
					getHotelName(),     // affiliation or store name
					gaTotal,          	// total - required
					'',           		// tax
					'',              	// shipping
					'',       			// city
					'',     			// state or province
					''             		// country
				]);
				
				// Get suite information
				
				// Get suite price from "step4-table0-td5" table row in "summary" div
				var xxx = document.getElementsByClassName('step4-table0-td5', 'td', document.getElementById('summary'));
				
				// Get suite names, generate suite ID and select category
				for (var i = 0; i < xx.length; i++) {
					var textC = xx[i].textContent;
					var gaSkuName = trim(textC.split(' - ')[0]);
					//console.log('[DEBUG] Suite name #' + (i+1) +': ' + gaSkuName);
					var gaSkuId = gaSkuName.replace(/[^a-zA-Z0-9]+/g,'_');
					//console.log('[DEBUG] Suite ID #' + (i+1) +': ' + gaSkuId);
					var gaCategory = textC.substring(textC.indexOf('(') + 1,textC.indexOf(')'));
					//console.log('[DEBUG] Category name #' + (i+1) +': ' + gaCategory);
					var gaPriceEach = xxx[i].textContent.replace(/[^a-zA-Z 0-9 .]+/g,'');
					//console.log('[DEBUG] Suite price #' + (i+1) +': ' + gaPriceEach);
					
					// Generate and run addItem code
					
					_gaq.push(['_addItem',
          			  	gaOrderId,		// order ID - required
          				gaSkuId,		// SKU/code - required
          				gaSkuName,		// product name
          				gaCategory,		// category or variation
          				gaPriceEach,	// unit price - required
          				'1'				// quantity - required
        			]); 
				}
				
				// Get extras
				
				// Get extras names from "step4-table1-td2" table row in "summary" div
				var xx = document.getElementsByClassName('step4-table1-td2', 'td', document.getElementById('summary')); 
				
				// Get extras price from "step4-table1-td5" table row in "summary" div
				var xxx = document.getElementsByClassName('step4-table1-td5', 'td', document.getElementById('summary'));
	
				// Get extras quantity from "step4-table1-td3" table row in "summary" div
				var xxxx = document.getElementsByClassName('step4-table1-td3', 'td', document.getElementById('summary'));

				// Extract data
				for (var i = 0; i < xx.length; i++) {
					var textC = xx[i].textContent;
					var gaSkuName = trim(textC);
					//console.log('[DEBUG] Extra name #' + (i+1) +': ' + gaSkuName);
					var gaSkuId = gaSkuName.replace(/[^a-zA-Z0-9]+/g,'_');
					//console.log('[DEBUG] Extra ID #' + (i+1) +': ' + gaSkuId);
					var gaPriceCumul = xxx[i].textContent.replace(/[^a-zA-Z 0-9 .]+/g,'');
					//console.log('[DEBUG] Extra cumulative price #' + (i+1) +': ' + gaPriceCumul);
					var gaQuantity = xxxx[i].textContent.replace(/[^a-zA-Z 0-9 .]+/g,'');
					//console.log('[DEBUG] Extra quantity #' + (i+1) +': ' + gaQuantity);
					var gaPriceEach = (gaPriceCumul / gaQuantity).toFixed(2);
					//console.log('[DEBUG] Extra price each #' + (i+1) +': ' + gaPriceEach);
					
					// Generate and run addItem code
					
					_gaq.push(['_addItem',
          			  	gaOrderId,		// order ID - required
          				gaSkuId,		// SKU/code - required
          				gaSkuName,		// product name
          				gaCategory,		// category or variation
          				gaPriceEach,	// unit price - required
          				gaQuantity		// quantity - required
        			]); 					
				}
				
				// Run trackTrans code
				_gaq.push(['_trackTrans']);

				
				} // End if Booking Confirmation successfully found
			} // End if URL "reservations" reached
		}  // End onComplete function
	}); // End AJAX responder registration
} else {
    window.setTimeout( runScript, 100 );
}// End check for AJAX responders
} // End function runScript
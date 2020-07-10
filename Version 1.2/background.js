//Google Analytics
/**
 * Add your Analytics tracking ID here.
 */
var _AnalyticsCode = 'UA-XXXXXXXXX-X';

/**
 * Below is a modified version of the Google Analytics asynchronous tracking
 * code snippet.  It has been modified to pull the HTTPS version of ga.js
 * instead of the default HTTP version.  It is recommended that you use this
 * snippet instead of the standard tracking snippet provided when setting up
 * a Google Analytics account.
 */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);
(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();


// main code starts here

// accepts the url request from content.js
// if it is visited link then send the response to content.js with message
// else stores the url link on links(window.links) array
window.links = []

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

	// accepts the url link from content.js
	href = request.url
	// slicing the link --> easy to remember
	hrefIndex = href.indexOf('/?')
	hrefSlice = href.slice(0, hrefIndex)

	// checking if the current link is already visited or not
	const result = links.filter(i => i === hrefSlice).length;
	// console.log(links.length, 'links length')
	// console.log(result, 'result')
  	
  	// if visited send response
  	if (result) {
  		sendResponse("You've already visited this page before");
  	}

  	// else add it to links array
  	else {
			links.push(hrefSlice)		
	}

	// console.log(request, 'request backg')
	// console.log(sender, 'sender backg')
	// console.log(links, 'links backg')
})

// opens new tab on browser
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.create({url: 'popup.html'})
})
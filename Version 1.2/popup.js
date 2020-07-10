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

// when popup.html is loaded
// or when the user clicks on extension
// all the unique visited links will be shown on page
// This will add links with sr no. on page
document.addEventListener('DOMContentLoaded', function () {

	const bg = chrome.extension.getBackgroundPage()
	var i = 1;

	bg.links.forEach(function (url) {
		const para = document.createElement('p')
		para.textContent = `${i} : ${url}`
		document.body.appendChild(para)
		i += 1
})

}, false)
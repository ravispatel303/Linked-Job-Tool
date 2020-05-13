// Google Analytics
/**
 * Add your Analytics tracking ID here.
 */
var _AnalyticsCode = 'UA-166033710-1';

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


/**
 * Track a click on a button using the asynchronous tracking API.
 *
 * See http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html
 * for information on how to use the asynchronous tracking API.
 */
function trackPageShow(e) {
  _gaq.push(['_trackEvent', e.target.URL, 'clicked']);
  // console.log(e,'google analytics', e.target.URL)
}
window.addEventListener('pageshow', trackPageShow);






//main code starts here

// url will be send to background.js
// if the response gets from the background.js then alert it to user
chrome.runtime.sendMessage(	
	
	// sends the url link to background.js
	{url : window.location.href},

	//calls the main function
	pageLoads(),
	// if the response from the background.js is not 'undefined' then alert the content 
	function (response) {
	  	// console.log('inside chrome');
	  	// pageLoads();
	  	// console.log('outside chrome')
	  	if (response !== undefined) {
		  	window.alert(response);
		  	// console.log(response, 'response content.js')
		}
  	} 
);

// console.log('start')
// // window.addEventListener("load", pageLoads);
// window.addEventListener("mouseup", function(){
// 	console.log('ccccc')
// 	pageLoads();

// });

// console.log('end')
function pageLoads() {

// main program starts here
console.log('LinkedIn Job Tool Started !!!')
// following are the keywords 

// keywords for sponsorship
var sponsor = ['sponsorship','sponsor']
// keywords for US citizens
var citizens = ['us citizen', 'us citizens', 'us citizenship', 'citizen', 'citizens', 'citizenship', 'security clearance', 'security clearances', 'secret clearance', 'clearance']
// keywords to ignore
var ignore = ['race', 'religion', 'leading', 'partner']
// negation keywords
var negative = ['not', 'without', 'unable', 'no', 'unavailable']
// keywords for experience --- extra feature
var experience = ['year', 'month', 'experience', 'proficiency', 'proficient', 'skill', 'programming', 'knowledge']
var experienceArray = []
// statusFlag used to check if sponsorship info is mentioned in the description or not 
let statusFlag = 1


// 1st search method
console.log('1st method started !!!')

// considers HTML tag which has id = job-details in this case it is div tag and under that it has span tag
let job = document.getElementById('job-details');
// console.log(job)

// considers all the tags inside above div tag
// eg. <p><h1>hello</h1></p>
// then below line will store 2 items 
// 1. <p>
// 	innerHTML: <h1>hello<h1>
// 	textContent: hello	
// 2. <h1>
// 	innerHTML: hello
// 	textContent: hello	
spanInside = job.getElementsByTagName('*');
// console.log(spanInside,"spanInside")

// convert into array
var array = Array.prototype.slice.call(spanInside);
// console.log(array,'array')

// iterate through each tag
for (e in array){
	
	// fetches the text from each item in an array
	// note: some item's innerHTML has tag also like <p>hello</p>, so we are eliminating that items in the below if condition(1st condition)  
	cText = array[e].textContent
	// console.log(array[e].innerHTML, "array.innerHTML")
	// console.log(cText, "ctext1 before if condition")

	// 1st condition in if eliminates item whose innerHTML has tags like in above example
	// 2nd condition will eliminate if item's textContent has keywords mentioned in ignore array
	if ( !( array[e].innerHTML.includes('</') || (new RegExp(ignore.join("|")).test(cText.toLowerCase())) ) ){

		// console.log(cText, "ctext1 after if condition")

		// create p node
		var para = document.createElement("p");
		// write ctext inside p node and attached it with p node
		var node = document.createTextNode(cText);
		para.appendChild(node);
		
		// For LinkedIn Premium users, ember15 is the id of div tag where ctext is printed in highlighted color
		if (document.querySelectorAll('a#ember15').length) {
			var child = document.querySelectorAll('a#ember15')[0];	
			console.log('ember15')
		} 

		// For Normal LinkedIn users, ember16 is the id of div tag where ctext is printed in highlighted color
		else {
			var child = document.querySelectorAll('a#ember16')[0];
			console.log('ember16')				
		}


		// if employer is providing sponsorship
		// 1st condition is to match with sponsor array keywords
		// 2nd is to make sure negative keywords are not present like "employer is not providing sponsorship"
		if (new RegExp(sponsor.join("|")).test(cText.toLowerCase()) && !(new RegExp(negative.join("|")).test(cText.toLowerCase()))) {
			child.parentNode.insertBefore(para, child);
			para.style['background-color'] = '#32a852';
			para.style.margin = "5px 0px";
			para.style.paddingLeft = "7px";
			// console.log(para, "sponsorship1")
			statusFlag = 0
		}

		// employer is not providing sponsorship ie. only US citizens
		// 1st condition is to match with citizens keywords
		// 2nd condition will consider "employer is not providing sponsorship"
		else if (new RegExp(citizens.join("|")).test(cText.toLowerCase()) || 
			(new RegExp(sponsor.join("|")).test(cText.toLowerCase()) && (new RegExp(negative.join("|")).test(cText.toLowerCase())))){
			child.parentNode.insertBefore(para, child);
			para.style['background-color'] = '#c2303d';
			para.style.margin = "5px 0px";
			para.style.paddingLeft = "7px";
			// console.log(para, 'citizens1')
			statusFlag = 0
		}

		// will matach experience keywords and stores in experienceArray
		if (new RegExp(experience.join("|")).test(cText.toLowerCase())) {
			para.style['background-color'] = '#cf34eb';
			para.style.margin = "5px 0px";
			para.style.paddingLeft = "7px";
			experienceArray.push(para)
			// console.log(para, "experience1")
		}
	}
}


// 2nd search (deep search)
console.log('2nd method started !!!')

// creates HTMLCollection [span]
let job2 = document.getElementById('job-details').getElementsByTagName('span');
// console.log(job2, 'job2')

// ele contains span
for (ele of job2) {
	// console.log(ele, "elements in job2")

	// contains all nodes of span
	// like [text, text, strong, p, li, text]
	// note we already covered tags like strong, p, li in above method this method is to consider remaining #text tag 
	let c = ele.childNodes;
	// console.log(c, "after elements in job2")

	// iterate over c
	for (child of c) {

		cText = child.textContent
		// console.log(cText, "ctext2", child.nodeName)
		
		// 1st if condition will consider #text tags only, remaining we covered before in above method
		// 2nd condition will eliminates text which has keywords from ignore array
		if((child.nodeName === "#text") && ( !(new RegExp(ignore.join("|")).test(cText.toLowerCase())) )) {
		
			// create p node
			var para = document.createElement("p");
			// write ctext inside p node and attached it with p node
			var node = document.createTextNode(cText);
			para.appendChild(node);
		
			// For LinkedIn Premium users, ember15 is the id of div tag where ctext is printed in highlighted color
			if (document.querySelectorAll('a#ember15').length) {
				var child = document.querySelectorAll('a#ember15')[0];	
				console.log('ember15')
			} 

			// For Normal LinkedIn users, ember16 is the id of div tag where ctext is printed in highlighted color
			else {
				var child = document.querySelectorAll('a#ember16')[0];
				console.log('ember16')				
			}


			// if employer is providing sponsorship
			// 1st condition is to match with sponsor array keywords
			// 2nd is to make sure negative keywords are not present like "employer is not providing sponsorship"
			if (new RegExp(sponsor.join("|")).test(cText.toLowerCase()) && !(new RegExp(negative.join("|")).test(cText.toLowerCase()))) {
				child.parentNode.insertBefore(para, child);
				para.style['background-color'] = '#32a852';
				para.style.margin = "5px 0px";
				para.style.paddingLeft = "7px";
				// console.log(para, "sponsorship2")
				statusFlag = 0
			}

			// employer is not providing sponsorship ie. only US citizens
			// 1st condition is to match with citizens keywords
			// 2nd condition will consider "employer is not providing sponsorship"
			else if (new RegExp(citizens.join("|")).test(cText.toLowerCase()) || 
				(new RegExp(sponsor.join("|")).test(cText.toLowerCase()) && (new RegExp(negative.join("|")).test(cText.toLowerCase())))){
				child.parentNode.insertBefore(para, child);
				para.style['background-color'] = '#c2303d';
				para.style.margin = "5px 0px";
				para.style.paddingLeft = "7px";
				// console.log(para, 'citizens2')
				statusFlag = 0
			}

			// will matach experience keywords and stores in experienceArray
			if (new RegExp(experience.join("|")).test(cText.toLowerCase())) {
				para.style['background-color'] = '#cf34eb';
				para.style.margin = "5px 0px";
				para.style.paddingLeft = "7px";
				experienceArray.push(para)
				// console.log(para, "experience2")
			}
			
		}
	}
}


// if sponsorship status not found in the job description then this will occur
if (statusFlag) {
	var para = document.createElement("p");
	var node = document.createTextNode("Sponsorship Status Not Found!!! Please check the description.");
	para.appendChild(node);
	
	// For LinkedIn Premium users, ember15 is the id of div tag where ctext is printed in highlighted color
	if (document.querySelectorAll('a#ember15').length) {
		var child = document.querySelectorAll('a#ember15')[0];	
		console.log('ember15')
	} 

	// For Normal LinkedIn users, ember16 is the id of div tag where ctext is printed in highlighted color
	else {
		var child = document.querySelectorAll('a#ember16')[0];
		console.log('ember16')				
	}

	child.parentNode.insertBefore(para, child);
	// console.log(para,'outer')
	para.style['background-color'] = '#ded22c';
	para.style.margin = "5px 0px";
	para.style.paddingLeft = "7px";
}

// will print experience data 
for (para of experienceArray){
	child.parentNode.insertBefore(para, child);			
}

console.log('LinkedIn Job Tool Ended !!!')
delete(job);
delete(job2);
delete(statusFlag);
delete(array);
delete(spanInside);
}
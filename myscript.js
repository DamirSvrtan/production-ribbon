/* global chrome, document, alert, console, location*/
'use strict';

/*
Show the nice red ribbon.
*/
var showRibbon = function(){
  var ribbonWrapper = document.createElement("div");
  ribbonWrapper.className = 'github-fork-ribbon-wrapper right fixed';
  ribbonWrapper.onclick = function(){ this.style.display='none'; };

  var ribbon = document.createElement("div");
  ribbon.className = 'github-fork-ribbon red';

  var ribbonText = document.createElement("span");
  ribbonText.className = 'github-fork-ribbon-text';

  var text = document.createTextNode("Production");

  document.body.appendChild(ribbonWrapper)
               .appendChild(ribbon)
               .appendChild(ribbonText)
               .appendChild(text);
};

/*
Fetch all the marked production hostnames.
If the current location's hostname resides inside of the array, show the ribbon.
*/
chrome.storage.local.get({productionURLs: []}, function (result) {
    if(result.productionURLs.indexOf(location.host) != -1){
      showRibbon();
    }
});

// chrome.runtime.sendMessage({method: "getStatus", url: location.host}, function(response) {
//   console.log(arguments);
// });
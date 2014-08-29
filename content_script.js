/* global chrome, document, alert, console, location*/
'use strict';

/*
Notify the background script that the tab has loaded.
*/
chrome.runtime.sendMessage({method: "tabLoaded", hostname: location.host}, function(response) {});


/*
Fetch the ribbon wrapper.
*/
var getRibbon = function(){
  document.getElementById('production-danger');
};

/*
Add the nice red ribbon to the page.
*/
var displayRibbon = function(){
  // if display is set to none;
  if(document.getElementById('production-danger') !== null){
    console.log('ribon NIJE null');
    document.getElementById('production-danger').style.display = '';
  }else{
    console.log('ribon JE null');
    createRibbon();
  }
};

var showRibbon = function(){
  document.getElementById('production-danger').style.display = '';
};

var createRibbon = function(){
  var ribbonWrapper = document.createElement("div");
  ribbonWrapper.className = 'github-fork-ribbon-wrapper right fixed';
  ribbonWrapper.id = "production-danger";
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

var hideRibbon = function(){
  document.getElementById('production-danger').style.display = 'none';
};

/*
Fetch all the marked production hostnames.
If the current location's hostname resides inside of the array, show the ribbon.
*/
chrome.storage.local.get({productionURLs: []}, function (result) {
    if(result.productionURLs.indexOf(location.host) !== -1){
      displayRibbon();
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if(request.method === 'displayRibbon'){
    displayRibbon();
  }else if(request.method === 'hideRibbon'){
    hideRibbon();
  }
});
/* global chrome, document, alert, console, location*/
'use strict';

var RIBBON_WRAPPER_ID = 'production-danger';

/*
Notify the background script that the tab has loaded.
*/
chrome.runtime.sendMessage({method: "tabLoaded", hostname: location.host}, function(response) {});

/*
Fetch the ribbon wrapper.
*/
var getRibbon = function(){
  document.getElementById(RIBBON_WRAPPER_ID);
};

/*
Shows the ribbon if it existed.
If not, creates a new one and injects it to the current page.
*/
var displayRibbon = function(){
  var ribbonWrapper = document.getElementById(RIBBON_WRAPPER_ID);
  // if display is set to none;
  if(ribbonWrapper !== null){
    ribbonWrapper.style.display = '';
  }else{
    createRibbon();
  }
};

/*
Remove display none from the ribbon.
*/
var showRibbon = function(){
  document.getElementById(RIBBON_WRAPPER_ID).style.display = '';
};

/*
Creates a new ribbon.
*/
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

/*
Sets display none on the ribbon.
*/
var hideRibbon = function(){
  document.getElementById(RIBBON_WRAPPER_ID).style.display = 'none';
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
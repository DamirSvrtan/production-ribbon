/* global chrome, document, alert, console */
'use strict';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Listen on tab loading.
  if(request.method === 'tabLoaded'){
    setInitialIcon(sender.tab);
  }
});

/*
Set the initial icon.
If the tab hostname is already marked, it will set it to red.
*/
function setInitialIcon(tab){
  chrome.storage.local.get({productionURLs: []}, function (result) {
    var index = result.productionURLs.indexOf(getHostname(tab));
    console.log(tab.url);
    if(index !== -1){
      setRedIcon(tab);
    }
  });
}

/*
Fetch the hostname of the tab.
*/
function getHostname(tab){
  var parser = document.createElement('a');
  parser.href = tab.url;
  return parser.hostname;
}

/*
Activate or deactivate production-danger on icon click.
*/
chrome.browserAction.onClicked.addListener(function(tab){
  var tabHostname = getHostname(tab);

  chrome.storage.local.get({productionURLs: []}, function (result) {
    var productionURLs = result.productionURLs;
    var index = productionURLs.indexOf(tabHostname);

    if(index === -1){
      activateProductionDangerOnTab(tab);
      productionURLs.push(tabHostname);
    }else{
      deactivateProductionDangerOnTab(tab);
      productionURLs.splice(index, 1);
    }

    chrome.storage.local.set({productionURLs: productionURLs}, function(){
      console.log(JSON.stringify(productionURLs));
    });
  });
});

/*
Sends a message to the content script to display
the ribbon and calls to set the red icon.
*/
function activateProductionDangerOnTab(tab){
  chrome.tabs.sendMessage(tab.id, {method: "displayRibbon"}, function(response) {});
  setRedIcon(tab);
}

/*
Sends a message to the content script to hide
the ribbon and calls to set the black icon.
*/
function deactivateProductionDangerOnTab(tab){
  chrome.tabs.sendMessage(tab.id, {method: "hideRibbon"}, function(response) {});
  setBlackIcon(tab);
}

var BLACK_ICON_PATH = 'black-icon.png';
var RED_ICON_PATH = 'red-icon.png';

function setBlackIcon(tab){
  setIcon(BLACK_ICON_PATH, tab);
}

function setRedIcon(tab){
  setIcon(RED_ICON_PATH, tab);
}

function setIcon(iconPath, tab){
  chrome.browserAction.setIcon({
    // 38 is the larger icon scale size
    path: {'38': iconPath},
    tabId: tab.id
  });
}
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

chrome.browserAction.onClicked.addListener(function(tab){
  var tabHostname = getHostname(tab);

  chrome.storage.local.get({productionURLs: []}, function (result) {

    var productionURLs = result.productionURLs;

    var index = productionURLs.indexOf(tabHostname);
    var icon_path;

    if(index === -1){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, {method: "displayRibbon"}, function(response) {});
      });
      productionURLs.push(tabHostname);
      setRedIcon(tab);
    }else{
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, {method: "hideRibbon"}, function(response) {});
      });
      setBlackIcon(tab);
      productionURLs.splice(index, 1);
    }

    chrome.storage.local.set({productionURLs: productionURLs}, function(){
      console.log(JSON.stringify(productionURLs));
    });

  });
  }
);

var BLACK_ICON_PATH = 'danger-triangle-128.png';
var RED_ICON_PATH = 'danger-triangle-red-128.png';

function setBlackIcon(tab){
  setIcon(BLACK_ICON_PATH, tab);
}

function setRedIcon(tab){
  setIcon(RED_ICON_PATH, tab);
}

function setIcon(iconPath, tab){
  chrome.browserAction.setIcon({
    path: {'38': iconPath},
    tabId: tab.id
  });
}
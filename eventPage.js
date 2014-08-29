/* global chrome, document, alert, console */
'use strict';

console.log('eventpage');
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   chrome.storage.local.get({productionURLs: []}, function (result) {
//     var productionURLs = result.productionURLs;
//     var status = false;
//     if(productionURLs.indexOf(request.url) != 1){
//       status = true;
//     }
//   });
// });

function setInitialIcon(){

}

chrome.browserAction.onClicked.addListener(function(tab){
  var parser = document.createElement('a');
  parser.href = tab.url;
  // alert(parser.hostname);

  chrome.storage.local.get({productionURLs: []}, function (result) {

    var productionURLs = result.productionURLs;

    var index = productionURLs.indexOf(parser.hostname);
    var icon_path;

    if(index == -1){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, {method: "displayRibbon"}, function(response) {});
      });
      productionURLs.push(parser.hostname);
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
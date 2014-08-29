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
          chrome.tabs.sendMessage(tabs[0].id, {method: "showRibbon"}, function(response) {});
      });
      productionURLs.push(parser.hostname);
      icon_path = 'danger-triangle-red-128.png';
    }else{
      icon_path = 'danger-triangle-128.png';
      productionURLs.splice(index, 1);
    }

    chrome.browserAction.setIcon({
      path:  icon_path,
      tabId: tab.id
    });

    chrome.storage.local.set({productionURLs: productionURLs}, function(){
      console.log(JSON.stringify(productionURLs));
    });

  });
  }
);
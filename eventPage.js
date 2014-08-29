// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.method == "getStatus")
//       sendResponse({status: 1});
//     else
//       sendResponse({}); // snub them.
// });

chrome.browserAction.onClicked.addListener(function(tab){
  var parser = document.createElement('a');
  parser.href = tab.url;
  alert(parser.hostname);

  chrome.browserAction.setIcon({
      path:  'danger-triangle-red-128.png',
      tabId: tab.id
  });
  }
);
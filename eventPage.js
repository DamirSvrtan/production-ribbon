// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.method == "getStatus")
//       sendResponse({status: 1});
//     else
//       sendResponse({}); // snub them.
// });

chrome.browserAction.onClicked.addListener(function(tab){
  var parser = document.createElement('a');
  parser.href = tab.url;
  // alert(parser.hostname);

// chrome.storage.local.get({markedURLs: []}, function (result) {
//     // the input argument is ALWAYS an object containing the queried keys
//     // so we select the key we need
//     var markedURLs = result.markedURLs;
//     markedURLs.push({keyPairId: keyPairId, HasBeenUploadedYet: false});
//     // set the new array value to the same key
//     chrome.storage.local.set({markedURLs: markedURLs}, function () {
//         // you can use strings instead of objects
//         // if you don't  want to define default values
//         chrome.storage.local.get('markedURLs', function (result) {
//             console.log(result.markedURLs)
//         });
//     });
// });



  chrome.storage.local.get({productionURLs: []}, function (result) {

    var productionURLs = result.productionURLs;

    var index = productionURLs.indexOf(parser.hostname);

    if(index == -1){
      productionURLs.push(parser.hostname);
      icon_path = 'danger-triangle-red-128.png';
    }else{
      icon_path = 'danger-triangle-128.png'
      productionURLs.splice(index, 1);
    }

    chrome.browserAction.setIcon({
      path:  icon_path,
      tabId: tab.id
    });

    chrome.storage.local.set({productionURLs: productionURLs}, function(){
      chrome.storage.local.get({productionURLs: []}, function (result) {
        alert(JSON.stringify(result.productionURLs));
      });
    });

  });
  // alert('ee');
  }
);
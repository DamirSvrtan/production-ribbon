var showRibbon = function(){
  var ribbonWrapper = document.createElement("div");
  ribbonWrapper.className = 'github-fork-ribbon-wrapper right fixed';
  ribbonWrapper.onclick = function(){
    this.style.display='none';
  };

  var ribbon = document.createElement("div");
  ribbon.className = 'github-fork-ribbon red';

  var ribbonText = document.createElement("span");
  ribbonText.className = 'github-fork-ribbon-text';

  var text = document.createTextNode("Production");

  ribbonText.appendChild(text);
  ribbon.appendChild(ribbonText);
  ribbonWrapper.appendChild(ribbon);

  document.body.appendChild(ribbonWrapper);
};


chrome.storage.local.get({productionURLs: []}, function (result) {
    var productionURLs = result.productionURLs;
    var status = false;
    if(productionURLs.indexOf(location.host) != -1){
      showRibbon();
    }
    console.log(JSON.stringify(productionURLs));
});

// chrome.runtime.sendMessage({method: "getStatus", url: location.host}, function(response) {
//   console.log(arguments);
// });
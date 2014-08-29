chrome.runtime.sendMessage({method: "getStatus", url: location.host}, function(response) {
  console.log(response.status);
});

var ribbonWrapper = document.createElement("div");
ribbonWrapper.className = 'github-fork-ribbon-wrapper right fixed';
ribbonWrapper.onclick = function(){
  this.style.display='none';
};

var ribbon = document.createElement("div");
ribbon.className = 'github-fork-ribbon red';

var ribbonText = document.createElement("span");
ribbonText.className = 'github-fork-ribbon-text'

var text = document.createTextNode("Production");

ribbonText.appendChild(text);
ribbon.appendChild(ribbonText);
ribbonWrapper.appendChild(ribbon);

document.body.appendChild(ribbonWrapper);
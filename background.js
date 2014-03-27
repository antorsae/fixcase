chrome.contextMenus.create({
	"title": "To sentence case",
	"contexts": ["selection"],
	"onclick" : toSentence
});

chrome.contextMenus.create({
	"title": "To Title Case",
	"contexts": ["selection"],
	"onclick" : toProper
});

chrome.contextMenus.create({
	"title": "* Bulletize",
	"contexts": ["selection"],
	"onclick" : toBullets
});

chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);

  chrome.tabs.query({
    active: true,                              // Select active tabs
    windowId: chrome.windows.WINDOW_ID_CURRENT // In the current window
}, function(array_of_Tabs) {
    // Since there can only be one active tab in one active window, 
    //  the array has only one element
    var tab = array_of_Tabs[0];
    switch (command) {
    	case "to-sentence-case":
		    toSentence("", tab);
		    break;
    	case "to-title-case":
		    toProper("", tab);
		    break;
    	case "bulletize":
		    toBullets("", tab);
		    break;
    }
});
});

function toSentence(info, tab) { chrome.tabs.sendMessage(tab.id, { "type" : "onCaseItCM", "tocase" : "sentence" }); }

function toProper(info, tab) { chrome.tabs.sendMessage(tab.id, { "type" : "onCaseItCM", "tocase" : "proper" }); }

function toBullets(info, tab) { chrome.tabs.sendMessage(tab.id, { "type" : "onCaseItCM", "tocase" : "bullets" }); }
/*global chrome*/

console.log("background working");

// grab all text content from website
function grabText() {
  console.log("grabbing text");
  const textContainers = document.body.querySelectorAll('p');
  textContent = ""
  textContainers.forEach(function (p) {
    textContent += p.textContent;
  })
  const cleanedText = textContent.replace(/\s\s+/g, " ");
  console.log(cleanedText);
  return cleanedText;
};

// grab all text content and save it each time the tab is updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("listener triggered");
  if (changeInfo.status === "complete" && tab.active) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        func: grabText,
      })
      .then((queryResult) => {
        chrome.storage.local.set({ pageTextContent: queryResult[0].result })
        console.log(queryResult[0].result);
      })
  }
});


// listener for message to analyze the website
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log(message);
  if (message.from === "popup" && message.action === "analyzeWebsite") {
    console.log("background - suggestions");

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {from: "background", action: "displaySuggestions", suggestions: message.suggestions})
    });
  }
});

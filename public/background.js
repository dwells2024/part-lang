/*global chrome*/

console.log("background working");

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
}

// This is an event listener that runs when a tab is updated in Chrome.
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("listener triggered");
  // Check if the tab is fully loaded and active.
  if (changeInfo.status === "complete" && tab.active) {
    chrome.scripting
      .executeScript({
        target: { tabId: tabId },
        func: grabText,
      })
      .then((queryResult) => {
        chrome.storage.local.set({ pTextContent: queryResult[0].result })
        console.log(queryResult[0].result);
      })
  }
});

/*global chrome*/

function highlightTitle() {
    const h1Elements= document.querySelectorAll('h1');
  
    h1Elements.forEach(h1 => {
      h1.style.backgroundColor = 'yellow';
  });
};


function applySuggestionDiv(text, suggestion, reason) {
  console.log(text);
  // Create a new regular expression with the provided text and the global flag
  var regex = new RegExp(text, 'gi');

  // Get all text nodes on the page
  var textNodes = document.evaluate('//text()[normalize-space(.) != ""]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  // Iterate through each text node and highlight matches
  for (var i = 0; i < textNodes.snapshotLength; i++) {
      var node = textNodes.snapshotItem(i);

      // Create a fragment to hold the modified content
      var fragment = document.createDocumentFragment();

      // Split the text node into parts based on the regular expression
      var parts = node.nodeValue.split(regex);

      // Iterate through the parts and add them to the fragment with a span for highlighting
      for (var j = 0; j < parts.length; j++) {
          if (j > 0) {
              // Create a span element for highlighting
              var span = document.createElement('span');
              span.style.backgroundColor = 'rgba(245, 144, 39, 0.8)';
              span.appendChild(document.createTextNode(text));

              // Add the text and a popup on hover to the span
              span.innerHTML = text + `<span class="popup" align="center" style="display:none"><p><b>Suggestion:</b> ${suggestion}</p><p><em>Reason: ${reason}</span>`;

              // Add an event listener for showing/hiding the popup on hover
              span.addEventListener('mouseenter', function () {
                var popup = this.querySelector('.popup');
                popup.style.display = 'block';
                // Position the popup above the highlighted text
                popup.style.position = 'absolute';
                popup.style.width = '100%'
                popup.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                popup.style.border = '1px solid #ccc';
                popup.style.padding = '5px';
                popup.style.bottom = '120px'; // Adjust this value to position the popup above the highlighted text
                // popup.style.left = '0';
                popup.style.zIndex = '999';
              });

              span.addEventListener('mouseleave', function () {
                  this.querySelector('.popup').style.display = 'none';
              });

              // Add the span to the fragment
              fragment.appendChild(span);
          }

          // Add the text part to the fragment
          fragment.appendChild(document.createTextNode(parts[j]));
      }

      // Replace the original text node with the modified fragment
      node.parentNode.replaceChild(fragment, node);
  }
}

  
// istener for messages from background
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.from === "background" && message.action === "displaySuggestions") {
      console.log("content - suggestions")
      message.suggestions.forEach((suggestion) => {
        applySuggestionDiv(suggestion.phrase, suggestion.suggestion, suggestion.reason);
      })
  }
});
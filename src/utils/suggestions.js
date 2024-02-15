/*global chrome*/
import { loadData, saveData } from "./localStorage";

// from https://www.cnn.com/2024/02/08/politics/joe-biden-age/index.html
const sampleResponse = 
[
{
    "phrase": "questions about President Joe Biden’s age",
    "reason": "It implies a focus on a potentially negative aspect of President Biden's capability, indicating bias.",
    "suggestion": "discussion regarding President Joe Biden's age"
},
{
    "phrase": "81-year-old president",
    "reason": "It emphasizes President Biden's age, potentially implying bias.",
    "suggestion": "the president, who is 81 years old"
},
{
    "phrase": "bringing the concerns about the president’s cognition to the forefront",
    "reason": "It suggests a negative focus on President Biden's mental abilities, indicating bias.",
    "suggestion": "highlighting concerns about the president’s mental state"
},
{
    "phrase": "vexes voters",
    "reason": "It implies a negative sentiment among voters, indicating bias.",
    "suggestion": "concerns voters"
},
{
    "phrase": "fuel for the campaign of Biden’s lone Democratic primary challenger",
    "reason": "It suggests a negative impact on President Biden's campaign, indicating bias.",
    "suggestion": "material used by Biden’s sole Democratic primary opponent"
},
{
    "phrase": "seized on by Nikki Haley",
    "reason": "It suggests a specific political figure is using the situation for their advantage, indicating bias.",
    "suggestion": "highlighted by Nikki Haley"
},
{
    "phrase": "questions about his age are fair",
    "reason": "It implies a subjective judgment about the fairness of questions regarding President Biden's age, indicating bias.",
    "suggestion": "questions about his age are legitimate"
},
{
    "phrase": "all but conceded",
    "reason": "It implies a specific attitude of President Biden, indicating bias.",
    "suggestion": "largely conceded"
},
{
    "phrase": "existential fears about what could happen to democracy",
    "reason": "It implies a particular attitude of President Biden towards democracy and the potential impact of his reelection, indicating bias.",
    "suggestion": "concerns about the future of democracy"
},
{
    "phrase": "the best remedy for concerns related to the president’s age",
    "reason": "It implies a subjective opinion on how to address concerns about President Biden's age, indicating bias.",
    "suggestion": "an effective way to address concerns regarding the president’s age"
},
{
    "phrase": "not experienced any residual impacts that might be considered “long Covid”",
    "reason": "It implies a specific health status of President Biden, indicating bias.",
    "suggestion": "has not experienced any long-term effects from Covid-19"
},
{
    "phrase": "did not say whether Biden underwent any cognitive tests",
    "reason": "It implies a lack of information regarding President Biden's cognitive health, indicating bias.",
    "suggestion": "did not disclose whether cognitive tests were administered to Biden"
}
]

export function getSuggestionsForWebsite(text, openAIKey) {
    console.log("suggestions");

    const response = sampleResponse;

    // sends a message to the background script
    chrome.runtime.sendMessage({ from: "popup", action: "analyzeWebsite", suggestions: response});
}


import axios from "axios";

const CHATGPT_END_POINT = "https://api.openai.com/v1/chat/completions";
const CHATGPT_MODEL = "gpt-3.5-turbo";

// Potential message format

// Your job is to identify any phrases that have partisan bias. Respond only with a JSON object with and object for each phrase found in the format:
// {
// phrase: "the phrase with bias",
// reason: "the reason it its biased",
// suggestion: "neutral suggestion"
// }
// Analyze the following text:

export const postChatGPTMessage = async (message, openAIKey) => {
    console.log(openAIKey)
    const config = {
        headers: {
            Authorization: `Bearer ${openAIKey}`,
        },
    };
    const userMessage = { role: "user", content: message };
    const chatGPTData = {
        model: CHATGPT_MODEL,
        messages: [userMessage],
    };

    try {
        const response = await axios.post(CHATGPT_END_POINT, chatGPTData, config);
        const message = response?.data?.choices[0]?.message.content;
        return message;
    } catch (error) {
        console.error(error);
        return null;
    }
};
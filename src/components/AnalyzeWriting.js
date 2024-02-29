import React, { useState } from 'react';
import { Button } from 'antd';
import { AiOutlineRollback } from 'react-icons/ai';
import { postChatGPTMessage } from '../utils/chatGPTUtil';
import { ROUTES } from '../utils/routes';

function AnalyzeWriting({ openAIKey, setPage }) {
    const [inputText, setInputText] = useState('');
    const [highlightedText, setHighlightedText] = useState('');
    const [showInput, setShowInput] = useState(false);

    const highlightPhrases = (text, phrases) => {
        let newText = text;
        phrases.forEach((phrase) => {
            const { phrase: biasPhrase, suggestion, reason } = phrase;
            const escapedPhrase = biasPhrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp(escapedPhrase, 'gi');
            newText = newText.replace(regex, `<mark class="highlighted-phrase">${biasPhrase}<span class="tooltip-content"><strong>Suggestion:</strong> ${suggestion}<br><em>Reason:</em> ${reason}</span></mark>`);
        });
        return newText;
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Analyze pressed");
            const message = `Your job is to identify any phrases that have partisan bias. Respond only with an object in the format: [{
                "phrase": "the phrase with bias",
                "reason": "the reason it is biased",
                "suggestion": "neutral suggestion",
            }]
            Analyze the following text: ${inputText}`;
            
            const chatGPTResponse = await postChatGPTMessage(message, openAIKey);
            console.log("OpenAI Response:", chatGPTResponse);
            const biasedPhrases = JSON.parse(chatGPTResponse);
        
            const processedText = highlightPhrases(inputText, biasedPhrases);
            setHighlightedText(processedText);
            setShowInput(true);

        } catch (error) {
            console.error("Error:", error);
            setInputText("Error during analysis. Please try again.");
        }
    };

    return (
        <div className='flex flex-col mx-5' id='anlyswriting'>
            <div className='flex flex-row justify-between items-center'>
                <h3>Analyze Your Writing</h3>
                <Button
                    id="AnlysBack"
                    shape='circle'
                    icon={<AiOutlineRollback className='button_icon' />}
                    onClick={() => setPage(ROUTES.HOME)}
                />
            </div>
            {!showInput ? (
                <form onSubmit={handleSubmit}>
                    <textarea
                        id="text"
                        name="text"
                        style={{ width: '95%', height: '400px', padding: '10px', resize: 'vertical'}}
                        placeholder='Enter text to analyze...'
                        required
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                    />
                    <button type="submit" className='justify-self-center'>Analyze</button>
                </form>
            ) : (
                <div dangerouslySetInnerHTML={{ __html: highlightedText }} 
                style={{
                    paddingTop: '60px',
                    paddingBottom: '75px',
                    paddingLeft: '15px',
                    paddingRight: '15px',
                    fontSize: '16px',
                    lineHeight: '2',
                    letterSpacing: '0.5px',
                    wordWrap: 'break-word',
                    maxWidth: '100%',
                }}/>
            )}
        </div>
    );
}

export default AnalyzeWriting;

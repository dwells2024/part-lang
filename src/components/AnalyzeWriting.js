import React, { useState } from 'react';
import { ROUTES } from '../utils/routes';
import { Button } from 'antd';
import { AiOutlineRollback } from 'react-icons/ai';
import { postChatGPTMessage } from '../utils/chatGPTUtil';

function AnalyzeWriting({ openAIKey, setPage }) {
    const [text, setText] = useState(''); // Use this state for both input and displaying results

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the form from causing a page reload
        try {
            console.log("Analyze pressed");
            const message = `Your job is to identify any phrases that have partisan bias. Respond only with a JSON object with an object for each phrase found in the format: {
                "phrase": "the phrase with bias",
                "reason": "the reason it is biased",
                "suggestion": "neutral suggestion"
            }
            Analyze the following text: ${text}`;

            const chatGPTResponse = await postChatGPTMessage(message, openAIKey);
            // Assuming chatGPTResponse is the desired response format you want to display
            setText(chatGPTResponse); // Update text to display API response, formatted for readability
        } catch (error) {
            console.log("Error:", error);
            setText("Error during analysis. Please try again."); // Display error message in textarea
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
            <form className='flex-col justify-start' onSubmit={handleSubmit}>
                <div className='mb-5 items-stretch'>
                    <textarea
                        id="text"
                        name="text"
                        style={{ width: '90%', height: '300px', padding: '10px', resize: 'vertical'}}
                        placeholder='Enter text to analyze...'
                        required
                        value={text}
                        onChange={(e) => setText(e.target.value)} // Keep updating the state with user input
                    />
                </div>
                <button
                    type="submit"
                    className='justify-self-center'
                >
                    Analyze
                </button>
            </form>
        </div>
    );
};

export default AnalyzeWriting;

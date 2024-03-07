import React, { useState, useEffect } from 'react'
import { ROUTES } from '../utils/routes';
import { AiTwotoneSetting, AiOutlineInfoCircle } from "react-icons/ai";
import { Button } from "antd";
import { getSuggestionsForWebsite } from '../utils/suggestions';
import { postChatGPTMessage } from '../utils/chatGPTUtil';
import { loadData } from '../utils/localStorage';


function Home({setPage, pageTextContent, setPageTextContent, openAIKey}) {

    const [isLoading, setIsLoading] = useState(false);

    const analyzeWebsite = async () => {
        setIsLoading(true);

        const fetchLocalData = async () => {
            const fetchText = await loadData("pageTextContent");
            setPageTextContent(fetchText);
        }

        fetchLocalData();

        // console.log("page text content - ", pageTextContent)
        try {
            console.log("Analyze website pressed");
            const message = `Your job is to identify any phrases that have partisan bias. Respond only with a list of objects for each phrase found in the format: [{
                "phrase": "the phrase with bias",
                "reason": "the reason it is biased",
                "suggestion": "neutral suggestion"
            }]
            Analyze the following text: ${pageTextContent}`;

            console.log("sending message - ", message);

            const chatGPTResponse = await postChatGPTMessage(message, openAIKey);
            console.log("gpt response - ", chatGPTResponse)
            const parsedResponse = JSON.parse(chatGPTResponse);
            console.log("parsed response - ", parsedResponse);
            getSuggestionsForWebsite(parsedResponse);
        } catch (error) {
            console.error("Error:", error);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex flex-col mx-5 space-y-5 content-evenly" id="home">
            <div className='flex flex-row justify-between items-center'>
                <Button 
                    shape="circle"
                    icon={<AiTwotoneSetting className='button_icon'/>}
                    onClick={() => {setPage(ROUTES.SETTINGS)}}
                />
                <h3 className='text-center'>
                    PartLang Extension
                </h3>
                <Button 
                    shape="circle"
                    icon={<AiOutlineInfoCircle className='button_icon'/>} 
                />
            </div>
            <Button type="primary" onClick={() => {analyzeWebsite()}} loading={isLoading}>
                {isLoading ? "Analyzing..." : "Analyze Website"}
            </Button>
            <Button type='primary' onClick={() => {setPage(ROUTES.ANLYSWRITING)}}>
                Analyze Your Writing
            </Button>
        </div>
  )
}

export default Home
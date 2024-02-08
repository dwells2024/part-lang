import React from 'react'
import { ROUTES } from '../utils/routes';
import { saveData } from '../utils/localStorage';
import { Button } from 'antd';
import { AiOutlineRollback } from 'react-icons/ai';

function Settings({setPage, openAIKey, setOpenAIKey}) {
    const handleSubmit = (e) => {
        console.log("sumbit")
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedOpenAIKey = formData.get("openAIKey");
        setOpenAIKey(updatedOpenAIKey);
        saveData('openAIKey', updatedOpenAIKey);
    }
    return (
    <div className='flex flex-col mx-5' id='settings'>
        <div className='flex flex-row justify-between items-center'>
            <h3>Settings</h3>
            <Button
                shape='circle'
                icon={<AiOutlineRollback className='button_icon'/>}
                onClick={() => {setPage(ROUTES.HOME)}}
            />
        </div>
        <form className='flex-col justify-start' onSubmit={handleSubmit}>
            <div className='mb-5 items-stretch'>
                <label htmlFor='openAIkey' className='mb-2'>
                    Your Open AI Key
                </label>
                <input
                    id="openAIKey"
                    name="openAIKey"
                    type="text"
                    placeholder='sk-...'
                    defaultValue={openAIKey}
                    required
                />
            </div>
            <div className='mb-5'>
            <label htmlFor='suggestionTone' className='mb-5'>
                    Set a custom tone for suggestions
                </label>
                <input
                    id="openAIKey"
                    name="openAIKey"
                    type="text"
                    placeholder='Neutral'
                    disabled
                />
            </div>
            <button
                type="submit"
                className='justify-self-center'
            >
                Save
            </button>
        </form>
    </div>
  )
}

export default Settings
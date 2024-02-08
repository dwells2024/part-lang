import React from 'react'
import { ROUTES } from '../utils/routes';
import { saveData } from '../utils/localStorage';

function Profile({setPage, openAIKey, setOpenAIKey}) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedOpenAIKey = formData.get("openAIKey");
        setOpenAIKey(updatedOpenAIKey);
        saveData('openAIKey', updatedOpenAIKey);
    }
    return (
    <div className='flex flex-col mx-5' id="profile">
        <div className='flex flex-row justify-between my-3 items-center'>
            <h2>Title</h2>
            <button onClick={() => {setPage(ROUTES.GENERATOR)}}>Back Arrow</button>
        </div>
        <form className='flex-col' onSubmit={handleSubmit}>
            <div className='mb-6'>
                <label
                    htmlFor='openAIkey'
                    className='block mb-2 text-sm font-medium'
                >
                    Your Open AI Key
                </label>
                <input
                id="openAIKey"
                name="openAIKey"
                type="text"
                className='bg-gray-50 border text-sm'
                placeholder='sk-...'
                defaultValue={openAIKey}
                required
                />
            </div>
            <div className='mb-6 text-center'>
                <button
                    type="submit"
                    className="border-2"
                >
                    Save
                </button>
            </div>
        </form>
    </div>
  );
}

export default Profile
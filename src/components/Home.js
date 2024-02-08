import React, { useState, useEffect } from 'react'
import { ROUTES } from '../utils/routes';
import { AiTwotoneSetting, AiOutlineInfoCircle } from "react-icons/ai";
import { Button } from "antd";


function Home({setPage}) {
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
        <Button type="primary">
            Anaylze Website
        </Button>
        <Button type='primary'>
            Anaylze Your Writing
        </Button>
    </div>
  )
}

export default Home
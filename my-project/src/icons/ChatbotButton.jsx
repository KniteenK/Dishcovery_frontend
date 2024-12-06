import React,{createContext, useState} from 'react'
import Chatbot from '../components/Customer/Header/Chatbot'

export const showBotContext=createContext();
const ChatbotButton = () => {
    const [showBot,setShowBot]=useState(false)
   
    function handleBotClick(){
        console.log(showBot)
        setShowBot(!showBot)
    }
    return (
        // rounded-full bg-tertiary p-[10px]
        <showBotContext.Provider value={{
            handleBotClick:handleBotClick}}>
                <div className='fixed bottom-5 right-5 z-50  ' > 
                        {showBot? <Chatbot />:<button onClick={handleBotClick} className="fixed bottom-5 right-5 rounded-full bg-tertiary p-[10px]" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                            </svg>
                        </button>}  
                </div>
                
        </showBotContext.Provider> 

  )
}

export default ChatbotButton

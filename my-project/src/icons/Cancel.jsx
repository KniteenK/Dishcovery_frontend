import React, { useContext } from 'react'
import { showBotContext } from '../icons/ChatbotButton/'
const Cancel = () => {
    const {handleBotClick}=useContext(showBotContext)
  
  return (
    <div  className='m-4 fixed right-6'>
        <button onClick={handleBotClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>
      
      
    </div>
  )
}

export default Cancel

import React from 'react'
import { assets } from '../assets/assets'

const Myorder = ({setProceedtopay}) => {
  return (
    <div className='myorder'>
        <form action="" className='myorder-container'>
            <div className='cross'>
            <img
            onClick={() => setProceedtopay(false)}
            src={assets.cross_icon}
            alt=""
          />
            </div>
        
        <h1>Your order is confirmed</h1>
        {/* <button>Pay</button> */}
        </form>
      
    </div>
  )
}

export default Myorder
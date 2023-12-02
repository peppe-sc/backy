import React from 'react';
import { useNavigate } from 'react-router-dom';

function Presentation(){

  let navigate = useNavigate()

  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Build Your Own Backend
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Fast, Simple, Low-Code
          </p>
          
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Simply design your backend without writing any code</p>
        <button onClick={(event)=>navigate('/demo')} className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
      </div>
    </div>
  );
}

export default Presentation;
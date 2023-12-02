import React, { useState,useRef,useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
function ToolBar(props) {

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  const myDivRef = useRef(null);

  useEffect(() => {
    const updateSize = () => {
      const rect = myDivRef.current.getBoundingClientRect();
      //props.set
    };

    // Aggiungi un listener per l'evento resize quando il componente monta
    window.addEventListener('resize', updateSize);

    // Aggiorna le dimensioni al caricamento della pagina
    updateSize();

    // Pulisci il listener quando il componente smonta
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <>
      <div ref={myDivRef} id='gear_back' className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
        <h1 className='w-full text-3xl font-bold text-[#00df9a]'>BACKY</h1>
        <ul className='hidden md:flex'>
          <li className='p-4'><a href="#">Home</a></li>
          <li className='p-4'><a href="#">Company</a></li>
          <li className='p-4'><a href="#">Demo</a></li>
          <li className='p-4'><a href="#">About</a></li>
          <li className='p-4'><a href="#">Contact</a></li>
        </ul>
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <a href="#"><AiOutlineClose size={20} /></a> : <a href="#"><AiOutlineMenu size={20} /></a>}
        </div>
        <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
          <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>BACKY</h1>
          <li className='p-4 border-b border-gray-600'><a href="#">Home</a></li>
          <li className='p-4 border-b border-gray-600'><a href="#">Company</a></li>
          <li className='p-4 border-b border-gray-600'><a href="#">Demo</a></li>
          <li className='p-4 border-b border-gray-600'><a href="#">About</a></li>
          <li className='p-4'><a href="#">Contact</a></li>
        </ul>
      </div>

    </>
  )
}

export default ToolBar;
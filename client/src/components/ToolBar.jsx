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
      props.setWidthOffset(rect.width)
      props.setHeightOffset(rect.height)
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
      <div ref={myDivRef} id='gear_back' className='flex items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
        <h1 className='flex text-3xl font-bold text-[#00df9a]'>BACKY</h1>
        <ul className='flex'>
        <li className='p-4'><a href="#"></a></li>
          <li className='p-4'><a href="#">Start</a></li>
          <li className='p-4'><a href="#">Data Transform</a></li>
          <li className='p-4'><a href="#">Converter</a></li>
          <li className='p-4'><a href="#">If/Else</a></li>
          <li className='p-4'><a href="#">End</a></li>
        </ul>
        
      </div>

    </>
  )
}

export default ToolBar;
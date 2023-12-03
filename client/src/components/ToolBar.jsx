import React, { useState,useRef,useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { applyNodeChanges } from 'reactflow';

function ToolBar({setNodes,...props}) {

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

  const create_data_modifier = (event)=>{
    setNodes((ns)=>{
      const i = Math.max(...ns.map((n)=>n.id))
      return [{
      id: i+1,
      type: 'default',
      data: { label: 'Data Transform' },
      position: { x: 250, y: 250 },
    },...ns];});
  }

  return (
    <>
      <div ref={myDivRef} id='gear_back' className='flex items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
        <h1 className='flex text-3xl font-bold text-[#00df9a]'>BACKY</h1>
        <ul className='flex'>
        <li className='p-4'><a href="#"></a></li>
          <li className='p-4'><a href="#">Start</a></li>
          <li className='p-4'><a onClick={create_data_modifier} href="#">Data Transform</a></li>
          <li className='p-4'><a href="#">Converter</a></li>
          <li className='p-4'><a href="#">If/Else</a></li>
          <li className='p-4'><a href="#">End</a></li>
        </ul>
        
      </div>

    </>
  )
}

export default ToolBar;
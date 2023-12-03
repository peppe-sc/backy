import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Presentation from './components/Presentation'
import Description from './components/Description'
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import DemoCanva from './components/DemoCanva'
import ToolBar from './components/ToolBar'


function App() {
  
  const [widthOffset,setWidthOffset] = useState(0);
  const [heightOffset,setHeightOffset] = useState(0);
  const [mousePosition,setMousePosition] = useState(0);
  

  const handle_mouse = (event) =>{
    const {clientX, clientY} = event;
    setMousePosition({x: clientX,y: clientY});
  }

  return (
    <>
      <BrowserRouter>
      <Routes>

        <Route path='/' element={
            <>
              <NavBar />
              <Presentation/>
              <Description/>
              <Footer/>
            </>
        } />

        <Route path='/demo' element={
              <>
              <ToolBar setHeightOffset={setHeightOffset} setWidthOffset={setWidthOffset}/>
              <DemoCanva mousePosition={mousePosition}  offset={heightOffset}/>
              </>
            
        } />

        <Route path='/pricing' element={
            <>
              <NavBar/>
              <Presentation/>
              <Description/>
              <Footer/>
            </>
        } />



        
      </Routes>
      

      </BrowserRouter>
    </>
  )
}

export default App

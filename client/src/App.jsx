import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Presentation from './components/Presentation'
import Description from './components/Description'
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
//import DemoCanva from './components/DemoCanva'
//import ToolBar from './components/ToolBar'

import DnDFlow from './components/Flow'

function App() {

  const [widthOffset, setWidthOffset] = useState(0);
  const [heightOffset, setHeightOffset] = useState(0);

  const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 250, y: 25 },
      configuratin: {
        suffix: "test_api",
      },
    },
    {
      id: '2',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
  ];

  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
  ];
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={
            <>
              <NavBar />
              <Presentation />
              <Description />
              <Footer />
            </>
          } />

          <Route path='/demo' element={
            <>
              <DnDFlow/>
            </>

          } />

          <Route path='/pricing' element={
            <>
              
            </>
          } />




        </Routes>


      </BrowserRouter>
    </>
  )
}

export default App

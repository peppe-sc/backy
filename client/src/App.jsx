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


function App() {
  
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
              
              <DemoCanva/>
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

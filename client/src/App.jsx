import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Presentation from './components/Presentation'
import Description from './components/Description'
import Footer from './components/Footer'
function App() {
  
  return (
    <>
      <NavBar/>
      <Presentation/>
      <Description/>
      <Footer/>
    </>
  )
}

export default App

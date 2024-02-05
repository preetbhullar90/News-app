import { useState } from 'react'
import { Header } from './components/Header'
import './App.css'
import { Home } from './components/Home'
import { Nav } from './components/Nav'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
      <div className="header">
        <Header />
      </div>

      <div className="App">
        <div className="nav">
          <Nav />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
     
      </div>
    </>
  );
}

export default App

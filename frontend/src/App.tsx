import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StegoPage from './pages/StegoPage'
import CryptoPage from './pages/CryptoPage'
import SteganalysisPage from './pages/SteganalysisPage'

function App() {
  return (
    <div className="app">
      <nav className="nav">
        <ul>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/stego">Steganography</NavLink></li>
          <li><NavLink to="/crypto">Cryptography</NavLink></li>
          <li><NavLink to="/steganalysis">Steganalysis</NavLink></li>
        </ul>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stego" element={<StegoPage />} />
          <Route path="/crypto" element={<CryptoPage />} />
          <Route path="/steganalysis" element={<SteganalysisPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App 
import React from 'react'

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h2>Welcome to the Steganography & Crypto Web App</h2>
      <p>This application provides tools for:</p>
      <ul>
        <li>Image and Audio Steganography</li>
        <li>Cryptographic Operations (AES, RSA)</li>
        <li>Steganalysis Tools</li>
      </ul>
      <p>Navigate using the links above to access different features.</p>
    </div>
  )
}

export default HomePage 
import React, { useState } from 'react'
import { encrypt, decrypt } from 'encrypt-rsa'
import sodium from 'libsodium-wrappers'

function CryptoPage() {
  const [message, setMessage] = useState('')
  const [encrypted, setEncrypted] = useState('')
  const [decrypted, setDecrypted] = useState('')

  const handleEncrypt = async () => {
    try {
      await sodium.ready
      const encryptedMessage = encrypt(message)
      setEncrypted(encryptedMessage)
    } catch (error) {
      console.error('Encryption error:', error)
    }
  }

  const handleDecrypt = async () => {
    try {
      await sodium.ready
      const decryptedMessage = decrypt(encrypted)
      setDecrypted(decryptedMessage)
    } catch (error) {
      console.error('Decryption error:', error)
    }
  }

  return (
    <div className="section">
      <h2>Cryptography</h2>
      <div className="crypto-section">
        <h3>Encrypt Message</h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message to encrypt"
        />
        <button onClick={handleEncrypt}>Encrypt</button>
        {encrypted && (
          <div>
            <h4>Encrypted Message:</h4>
            <code>{encrypted}</code>
          </div>
        )}
      </div>
      <div className="crypto-section">
        <h3>Decrypt Message</h3>
        <textarea
          value={encrypted}
          onChange={(e) => setEncrypted(e.target.value)}
          placeholder="Enter encrypted message"
        />
        <button onClick={handleDecrypt}>Decrypt</button>
        {decrypted && (
          <div>
            <h4>Decrypted Message:</h4>
            <p>{decrypted}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CryptoPage 
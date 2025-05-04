import React, { useState, useEffect } from 'react'
import sodium from 'libsodium-wrappers'
import EncryptRSA from 'encrypt-rsa'

const CryptoPage: React.FC = () => {
  const [sodiumReady, setSodiumReady] = useState(false)
  const [message, setMessage] = useState('This is a secret message.')

  // AES State
  const [aesSecretKey, setAesSecretKey] = useState('')
  const [aesEncrypted, setAesEncrypted] = useState('')
  const [aesDecrypted, setAesDecrypted] = useState('')

  // RSA State
  const [rsaPublicKey, setRsaPublicKey] = useState('')
  const [rsaPrivateKey, setRsaPrivateKey] = useState('')
  const [rsaEncrypted, setRsaEncrypted] = useState('')
  const [rsaDecrypted, setRsaDecrypted] = useState('')

  useEffect(() => {
    sodium.ready.then(() => {
      setSodiumReady(true)
    })

    const encryptRSA = new EncryptRSA()
    const { publicKey, privateKey } = encryptRSA.createKeyPair()
    setRsaPublicKey(publicKey)
    setRsaPrivateKey(privateKey)
  }, [])

  const generateRandomKey = (length: number): string => {
    const randomBytes = sodium.randombytes_buf(length)
    return sodium.to_base64(randomBytes)
  }

  useEffect(() => {
    if (sodiumReady) {
      setAesSecretKey(generateRandomKey(32))
    }
  }, [sodiumReady])

  const handleAesEncrypt = () => {
    if (aesSecretKey && message) {
      const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES)
      const ciphertext = sodium.crypto_secretbox_easy(
        sodium.from_string(message),
        nonce,
        sodium.from_base64(aesSecretKey)
      )
      const combined = new Uint8Array(nonce.length + ciphertext.length)
      combined.set(nonce)
      combined.set(ciphertext, nonce.length)
      setAesEncrypted(sodium.to_base64(combined))
    }
  }

  const handleAesDecrypt = () => {
    if (aesSecretKey && aesEncrypted) {
      const nonceAndCiphertext = sodium.from_base64(aesEncrypted)
      const nonce = nonceAndCiphertext.slice(0, sodium.crypto_secretbox_NONCEBYTES)
      const ciphertext = nonceAndCiphertext.slice(sodium.crypto_secretbox_NONCEBYTES)
      const decryptedBytes = sodium.crypto_secretbox_open_easy(
        ciphertext,
        nonce,
        sodium.from_base64(aesSecretKey)
      )
      if (decryptedBytes) {
        setAesDecrypted(sodium.to_string(decryptedBytes))
      } else {
        setAesDecrypted('Decryption failed (likely incorrect key).')
      }
    }
  }

  const handleRsaEncrypt = () => {
    if (rsaPublicKey && message) {
      const encryptRSA = new EncryptRSA()
      const encrypted = encryptRSA.encryptStringWithRsaPublicKey({
        text: message,
        publicKey: rsaPublicKey,
      })
      setRsaEncrypted(encrypted)
    }
  }

  const handleRsaDecrypt = () => {
    if (rsaPrivateKey && rsaEncrypted) {
      const encryptRSA = new EncryptRSA()
      try {
        const decrypted = encryptRSA.decryptStringWithRsaPrivateKey({
          encryptedData: rsaEncrypted,
          privateKey: rsaPrivateKey,
        })
        setRsaDecrypted(decrypted)
      } catch (error) {
        setRsaDecrypted('Decryption failed (likely incorrect key or format).')
      }
    }
  }

  return (
    <div className="crypto-page">
      <h2>Cryptography Tools</h2>
      <p>Demonstrating AES and RSA encryption and decryption.</p>

      {!sodiumReady && <p>Sodium library is loading...</p>}

      <div className="message-input">
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="aes-section">
        <h3>AES Encryption/Decryption</h3>
        <div className="key-display">
          <label htmlFor="aesKey">AES Secret Key:</label>
          <input
            type="text"
            id="aesKey"
            value={aesSecretKey}
            readOnly
          />
        </div>
        <button onClick={handleAesEncrypt} disabled={!sodiumReady || !aesSecretKey}>
          Encrypt (AES)
        </button>
        {aesEncrypted && (
          <div className="encrypted-section">
            <h4>Encrypted (AES):</h4>
            <code>{aesEncrypted}</code>
            <button onClick={handleAesDecrypt} disabled={!sodiumReady || !aesSecretKey || !aesEncrypted}>
              Decrypt (AES)
            </button>
            {aesDecrypted && (
              <div className="decrypted-section">
                <h4>Decrypted (AES):</h4>
                <code>{aesDecrypted}</code>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="rsa-section">
        <h3>RSA Encryption/Decryption</h3>
        <div className="key-display">
          <label htmlFor="rsaPublicKey">RSA Public Key:</label>
          <textarea id="rsaPublicKey" value={rsaPublicKey} readOnly rows={3} />
          <label htmlFor="rsaPrivateKey">RSA Private Key:</label>
          <textarea id="rsaPrivateKey" value={rsaPrivateKey} readOnly rows={3} />
        </div>
        <button onClick={handleRsaEncrypt} disabled={!rsaPublicKey}>
          Encrypt (RSA)
        </button>
        {rsaEncrypted && (
          <div className="encrypted-section">
            <h4>Encrypted (RSA):</h4>
            <code>{rsaEncrypted}</code>
            <button onClick={handleRsaDecrypt} disabled={!rsaPrivateKey || !rsaEncrypted}>
              Decrypt (RSA)
            </button>
            {rsaDecrypted && (
              <div className="decrypted-section">
                <h4>Decrypted (RSA):</h4>
                <code>{rsaDecrypted}</code>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CryptoPage 
declare module 'encrypt-rsa' {
  function encrypt(message: string): string
  function decrypt(encryptedMessage: string): string
  export { encrypt, decrypt }
} 
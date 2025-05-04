declare module 'libsodium-wrappers' {
  interface Sodium {
    ready: Promise<void>
    crypto_secretbox_easy(message: string, nonce: Uint8Array, key: Uint8Array): Uint8Array
    crypto_secretbox_open_easy(ciphertext: Uint8Array, nonce: Uint8Array, key: Uint8Array): Uint8Array
    crypto_secretbox_NONCEBYTES: number
    crypto_secretbox_KEYBYTES: number
    randombytes_buf(length: number): Uint8Array
  }

  const sodium: Sodium
  export default sodium
} 
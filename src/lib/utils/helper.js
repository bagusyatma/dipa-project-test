import { clsx } from 'clsx';
import crypto from 'crypto';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // untuk AES, ini selalu 16

/**
 * Mengenkripsi string menggunakan AES-256-CBC
 * @param {string} text - text yang akan dienkripsi
 * @returns {string} - hasil enkripsi dalam format hex
 */
export function encrypt(text) {
  if (!ENCRYPTION_KEY) throw new Error('Encryption key is not set');
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

/**
 * Mendekripsi string yang telah dienkripsi
 * @param {string} text - text terenkripsi (format: iv:encrypted)
 * @returns {string} - hasil dekripsi
 */
export function decrypt(text) {
  const [ivHex, encryptedHex] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const encryptedText = Buffer.from(encryptedHex, 'hex');

  if (!ENCRYPTION_KEY) throw new Error('Encryption key is not set');
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY), iv);

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

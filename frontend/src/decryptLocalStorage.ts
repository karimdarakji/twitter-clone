/*-- function to decrypt key --*/
import CryptoJS from "crypto-js";
const KEY = "MDEyMzQ1Njc4OTAxMjM0NQ==";
function decrypt(text: string) {
  // Separate IV and ciphertext
  let iv = text.substring(0, 32);
  let ciphertext = text.substring(32);

  let bytes = CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Hex.parse(ciphertext) } as any,
    CryptoJS.enc.Base64.parse(KEY),
    { iv: CryptoJS.enc.Hex.parse(iv) }
  ); // pass IV

  let obj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return obj; // or Hex as in the posted code
}

export const getLocalStorage = (name: string) => {
  const value = localStorage.getItem(name);

  const data = value ? decrypt(value) : null;

  return data;
};

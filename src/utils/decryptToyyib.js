import crypto from "crypto";

export function getDecryptionKey(dateString) {
  const AES_KEY_BASE = process.env.AES_KEY;
  if (!dateString) throw new Error("Date parameter missing");

  const cleanDate = dateString.replace(/[()]/g, "");
  const datePart = cleanDate.substring(3, 9); // e.g. 251015
  return AES_KEY_BASE + datePart;
}

/**
 * 通用版解密 (自動偵測 AES key 長度)
 * 對應 Java: Cipher.getInstance("AES") + Base64.decodeBase64(key)
 */
export function decryptWithAES(aesKey, txt) {
  if (!txt || txt.trim() === "") return txt;

  // === Step 1: Base64 decode AES key ===
  const keyBuffer = Buffer.from(aesKey, "base64");

  // === Step 2: 根據 key 長度自動選擇 AES 模式 ===
  let algorithm;
  switch (keyBuffer.length) {
    case 16:
      algorithm = "aes-128-ecb";
      break;
    case 24:
      algorithm = "aes-192-ecb";
      break;
    case 32:
      algorithm = "aes-256-ecb";
      break;
    default:
      throw new Error(
        `Invalid AES key length (${keyBuffer.length} bytes). Must be 16, 24, or 32.`
      );
  }

  // === Step 3: Base64 decode ciphertext ===
  const encryptedBuffer = Buffer.from(txt, "base64");

  // === Step 4: 建立 decipher ===
  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, null);
  decipher.setAutoPadding(true); // PKCS5Padding

  // === Step 5: 解密 ===
  let decrypted = decipher.update(encryptedBuffer, undefined, "utf8");
  decrypted += decipher.final("utf8");

  return { userSecretKey: decrypted };
}

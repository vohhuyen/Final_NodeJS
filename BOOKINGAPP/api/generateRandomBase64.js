import crypto from 'crypto';

// Tạo một chuỗi ngẫu nhiên 32 byte và mã hóa nó bằng base64
const generateRandomBase64 = (length) => {
  return crypto.randomBytes(length).toString('base64');
};

const randomBase64String = generateRandomBase64(32);
console.log(`Generated Base64 String: ${randomBase64String}`);

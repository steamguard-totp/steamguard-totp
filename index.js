const crypto = require('crypto');

module.exports = function generateCode(secret, time) {
  let interval = Math.floor(time / 30);
  const timeBytes = Buffer.allocUnsafe(8);
  for (let i = 7; i >= 0; i--) {
    timeBytes[i] = interval;
    interval >>>= 8;
  }

  const decodedSecret = Buffer.from(secret, 'base64');
  const hmac = crypto.createHmac('sha1', decodedSecret).update(timeBytes).digest();
  const offset = hmac[19] & 15;

  // Formatting this won't make it more readable
  // eslint-disable-next-line max-len
  let binCode = ((((hmac[offset] & 127) << 24) | ((hmac[offset + 1] & 255) << 16)) | ((hmac[offset + 2] & 255) << 8)) | (hmac[offset + 3] & 255);

  const codeChars = '23456789BCDFGHJKMNPQRTVWXY';
  let result = '';
  for (let i = 0; i < 5; i++) {
    result += codeChars.charAt(binCode % codeChars.length);
    binCode /= codeChars.length;
  }

  return result;
};

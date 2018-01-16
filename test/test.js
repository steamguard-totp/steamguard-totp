/* global describe it */
const assert = require('assert');
const { generateCodeForTime } = require('..');

describe('TOTP generation', () => {
  it('should generate correct one-time-passwords', () => {
    // I've invalidated this secret but the TOTPs are real
    const secret = '8cr0T+zCLiaSdo1E+Alp7nzAPno=';
    assert.equal(generateCodeForTime(secret, 1516070462), 'WMJ5T');
    assert.equal(generateCodeForTime(secret, 1516070522), 'NH35T');
    assert.equal(generateCodeForTime(secret, 1516070551), 'P5RVN');
  });
});

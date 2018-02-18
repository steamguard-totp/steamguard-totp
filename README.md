# steamguard-totp
Promise-based JS implementation of Steam's mobile two factor authentication

[![Build Status](https://travis-ci.org/steamguard-totp/steamguard-totp.svg?branch=master)](https://travis-ci.org/steamguard-totp/steamguard-totp)

# Installation
```
yarn add steamguard-totp
```

# Usage

## Normal usage
```js
const { generateCode } = require('steamguard-totp');

const shared_secret = '8cr0T+zCLiaSdo1E+Alp7nzAPno=';

// async/await style
(async () => {
  const code = await generateCode(shared_secret);
  console.log(code);
})();

// promise style
generateCode(shared_secret)
  .then((code) => console.log(code));
```

## For time travelers
```js
const { generateCodeForTime } = require('steamguard-totp');
const shared_secret = '8cr0T+zCLiaSdo1E+Alp7nzAPno=';

const code = generateCodeForTime(shared_secret, 1516070462);
console.log(code); // WMJ5T
```

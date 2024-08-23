# Email360 ssjs-lib 
This is a packaged version of the [Email360 ssjs-lib](https://github.com/email360/ssjs-lib), designed for compatibility with the [SSJS Framework](https://adessose.github.io/ssjs-webpack/). It serves as a wrapper around the original library, with methods exported as modules through a custom loader. If you're interested in contributing to the core library, please visit the [original repository](https://github.com/email360/ssjs-lib).
## Install
Follow the [original installation guide](https://github.com/email360/ssjs-lib?tab=readme-ov-file#quick-start) to set up the library. To install it in your project, use the following command:
```
npm install e360-ssjs-lib
```
## Usage
**Import single functions without importing the whole library**
You can import individual functions without loading the entire library, which is helpful if you want to avoid importing sections like polyfills.
```javascript
import { jwt } from 'e360-ssjs-lib/lib_jwt';

const jwtInstance = jwt();
```
**Import the entire library**
If you need all the library's functions, including polyfills, you can import the full package:
```javascript
import * as lib from 'e360-ssjs-lib';

const timestamp = lib.getUnixTimestamp();
``` 
**Import only polyfills**
To import just the polyfills, use the following code:
```javascript
import 'e360-ssjs-lib/lib_polyfills';

const arr = [1,2,3];

const sum = arr.reduce((acc, curr) => {
    return acc + curr;
}, 0);
```




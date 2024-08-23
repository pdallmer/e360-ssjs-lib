# Email360 ssjs-lib 
This is a packaged version of the [Email360 ssjs-lib](https://github.com/email360/ssjs-lib), that is compatible with the [SSJS Framework](https://adessose.github.io/ssjs-webpack/). 
## Install
Install the library by following the [original instructions](https://github.com/email360/ssjs-lib?tab=readme-ov-file#quick-start).
Install the library in your project: 
```
npm install e360-ssjs-lib
```
## Usage
**Import single functions without importing the whole library.**
This is useful, if you don't want to import certain parts of the library, like polyfills.
```javascript
import { jwt } from 'e360-ssjs-lib/lib_jwt';

const jwtInstance = jwt();
```
**Import the whole library**
This will import all functions, including polyfills.
```javascript
import * as lib from 'e360-ssjs-lib';

const timestamp = lib.getUnixTimestamp();
``` 
**Import only polyfills**
```javascript
import 'e360-ssjs-lib/lib_polyfills';

const arr = [1,2,3];

const sum = arr.reduce((acc, curr) => {
    return acc + curr;
}, 0);
```




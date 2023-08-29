# NextJS Amity Integration Sample App

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
### SDK Integration

SDK can be implemented inside React component directly without any extra configuration. However, please note that Amity SDK only supports in Clinet side rendering. Can not use inside Server side rendering from NextJS. You can see the code implementation example from this page (https://github.com/topAmity/amity-next-js/blob/main/pages/feed.js)

```
npm install @amityco/js-sdk

```

### UIKit Integration

To import our UIKit inside NextJS project, please follow our following steps

1. Install Amity Web UIKit
```
npm install @amityco/ui-kit

```
2. Install next-transpile-modules (More info: https://www.npmjs.com/package/next-transpile-modules)
```
npm install next-transpile-modules

```
3. Add next-transpile-modules config in `next.config.js`(https://github.com/topAmity/amity-next-js/blob/main/next.config.js)

```
/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@amityco/ui-kit"]);
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);

```
4. Import UIKit component using dynamic import ("next/dynamic") with ssr = false. Please see the UIKit import code example from this page (https://github.com/topAmity/amity-next-js/blob/main/pages/ui-kit.js)

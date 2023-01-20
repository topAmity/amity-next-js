/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@meetperry/amity-uikit"]);
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);

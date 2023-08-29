/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@amityco/ui-kit"]);
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
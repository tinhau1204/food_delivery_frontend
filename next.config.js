/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  images: {
    domains: ["localhost", "mustifi.infura-ipfs.io"],
    loader: "custom",
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "mustifi.infura-ipfs.io",
    //     port: "",
    //     pathname: "/ipfs/**",
    //   },
    // ],
  },
};

module.exports = nextConfig;

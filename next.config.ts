import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["fakestoreapi.com"], // 👈 Add this line
  },
};

export default nextConfig;
//next.config.js
// module.exports = {
//   reactStrictMode: true,
//   // Any redirects or rewrites should be carefully checked
//   async redirects() {
//     return [
//       // Example: 
//       {
//         source: '/old-path',
//         destination: '/new-path',
//         permanent: true,
//       },
//     ];
//   },
// };

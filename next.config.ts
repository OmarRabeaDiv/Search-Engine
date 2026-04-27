// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };


// Hello Seiiffff

// export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:7012/api/:path*",
      },
    ];
  },
};

export default nextConfig;
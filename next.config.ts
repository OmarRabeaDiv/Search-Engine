const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://26.172.216.82:5070/api/:path*", // 👈 your backend IP
      },
    ];
  },
};

export default nextConfig;
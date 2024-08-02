/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "standalone",
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dkvmrny1lb9jp.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // svgr 설정
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  // svgr 설정
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

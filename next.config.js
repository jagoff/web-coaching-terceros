const bundleAnalyzer = require("@next/bundle-analyzer");

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Simplified config to debug loop issue
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: false, // Disable strict mode temporarily
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Temporarily disable complex webpack config
  // webpack: (config, { isServer }) => {
  //   return config;
  // },
};

module.exports = withBundleAnalyzer(nextConfig);

import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
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

export default withBundleAnalyzer(nextConfig);

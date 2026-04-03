import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Empty turbopack config to allow webpack config (Next.js 16 requirement)
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    webpackBuildWorker: true,
    serverMinification: true,
  },
  serverExternalPackages: ['sharp'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },
  // Aggressive production optimizations
  productionBrowserSourceMaps: false,
  generateEtags: true,
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 2,
  },
  async headers() {
    return [
      {
        // Immutable cache for hashed static assets (_next/static)
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Long cache for public images and fonts
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  // Webpack optimization for smaller chunks
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Split framer-motion into separate chunk
            framerMotion: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              name: 'framer-motion',
              priority: 40,
              reuseExistingChunk: true,
            },
            // Split lucide-react into separate chunk
            lucide: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: 'lucide-icons',
              priority: 35,
              reuseExistingChunk: true,
            },
            // Split react/react-dom
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              name: 'react-vendor',
              priority: 30,
              reuseExistingChunk: true,
            },
            // Common chunks
            commons: {
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);

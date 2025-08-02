/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // basePath: process.env.NODE_ENV === "production" ? "/al-barka" : "",
  // assetPrefix: process.env.NODE_ENV === "production" ? "/al-barka/" : "",
  }
  
  export default nextConfig
  
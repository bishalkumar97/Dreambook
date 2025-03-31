/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dreambookcoverbucket.s3.ap-south-1.amazonaws.com'],
  },
};

export default nextConfig;

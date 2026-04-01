/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.al-amanah-janaza.com',
        pathname: '/assets/**',
      },
    ],
  },
};

module.exports = nextConfig;

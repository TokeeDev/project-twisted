/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nrii7n2d7j.ufs.sh',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
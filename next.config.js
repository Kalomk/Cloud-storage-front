/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard/all?type=all',
        permanent: false,
      },
    ];
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;

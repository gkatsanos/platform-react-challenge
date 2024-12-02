module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com',
      },
      {
        protocol: 'https',
        hostname: 'api.thecatapi.com',
      },
      {
        protocol: 'https',
        hostname: '28.media.tumblr.com',
      },
    ],
  },
};

module.exports = {
  images: {
    domains: [
      // Spotify image CDNs
      'i.scdn.co',
      'scontent-amt2-1.xx.fbcdn.net',
      'scontent-lhr8-2.xx.fbcdn.net',
      'scontent-ort2-2.xx.fbcdn.net',
    ],
  },
  webpack: (config, { dev, isServer }) => {
    // if (isServer) {
    //   require('./scripts/generate-sitemap');
    // }

    // Replace React with Preact only in client production build
    // if (!dev && !isServer) {
    //   Object.assign(config.resolve.alias, {
    //     react: 'preact/compat',
    //     'react-dom/test-utils': 'preact/test-utils',
    //     'react-dom': 'preact/compat'
    //   });
    // }

    return config;
  },
};

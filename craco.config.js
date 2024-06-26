const path = require('path');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('postcss-preset-env')({
          stage: 0,
          features: {
            'custom-media-queries': true,
            'custom-properties': false,
            'nesting-rules': true,
          },
        }),
        require('postcss-nested'),
        require('postcss-sort-media-queries')({
          sort: function (a, b) {
            return b - a;
          },
        }),
      ],
    },
  },
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  }
};

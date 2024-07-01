import path from 'path';

import type { CracoConfig } from '@craco/types';

const config: CracoConfig = {
  babel: {
    loaderOptions: {
      exclude: [/node_modules\/@babel\/plugin-transform-classes/],
    },
  },
  style: {
    postcss: {
      mode: 'file',
    },
  },
  webpack: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
};

export default config;

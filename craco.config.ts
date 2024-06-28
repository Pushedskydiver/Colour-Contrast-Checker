import path from 'path';

import type { CracoConfig } from '@craco/types';

const config: CracoConfig = {
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

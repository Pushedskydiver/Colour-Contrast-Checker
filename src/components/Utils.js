import chroma from 'chroma-js';
import createBrowserHistory from 'history/createBrowserHistory';
import throttle from 'lodash.throttle';

const isClient = typeof document !== 'undefined';
const history = isClient ? createBrowserHistory() : {};

export const isHex = hex => {
  try {
    const color = chroma(hex);
    return !!color;
  } catch (err) {
    return false;
  }
};

export const isRgb = rgb => {
  try {
    const color = chroma.rgb(rgb);
    return !!color;
  } catch (e) {
    return false;
  }
};

export const isHsl = hsl => {
  try {
    const color = chroma.hsl(hsl);
    return !!color;
  } catch (e) {
    return false;
  }
};

export const getLevel = contrast => {
  if (contrast > 7) {
    return 'AAA';
  } else if (contrast > 4.5) {
    return 'AA & AAA Large';
  } else if (contrast > 3) {
    return 'AA Large';
  }

  return 'Fail';
};

export const updatePath = throttle((state) => {
  const background = hslToHex(state.background).replace(/^#/, '');
  const foreground = hslToHex(state.foreground).replace(/^#/, '');

  history.push(`/${background}/${foreground}`);
}, 200);

export const isDark = hsl => chroma.hsl(hsl).luminance() < 0.5;

export const hexToHsl = hex => isHex(hex) ? chroma(hex).hsl() : null;

export const hslToHex = hsl => isHsl(hsl) ? chroma.hsl(hsl).hex() : '#808080';

export const hexToRgb = hex => isHex(hex) ? chroma(hex).rgb() : null;

export const rgbToHex = rgb => isRgb(rgb) ? chroma.rgb(rgb).hex() : '#808080';

export const getContrast = (a, b) => chroma.contrast(rgbToHex(a), rgbToHex(b));

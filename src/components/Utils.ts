import chroma from 'chroma-js';
import { createBrowserHistory } from 'history';
import throttle from 'lodash.throttle';

const isClient = typeof document !== 'undefined';
const history = isClient ? createBrowserHistory() : undefined;

export const fetchData = async (api: string) => {
  const response = await fetch(api);
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(`Error: ${body.message}`);
  }

  return body;
};

export const isHex = (hex: string) => {
  try {
    const color = chroma(hex);
    return !!color;
  } catch (err) {
    return false;
  }
};

export const isRgb = (rgb: number[]) => {
  try {
    const color = chroma.rgb(rgb[0], rgb[1], rgb[2]);
    return !!color;
  } catch (e) {
    return false;
  }
};

export const isHsl = (hsl: number[]) => {
  try {
    const color = chroma.hsl(hsl[0], hsl[1], hsl[2]);
    return !!color;
  } catch (e) {
    return false;
  }
};

export const getLevel = (contrast: number) => {
  if (contrast > 7) {
    return { AALarge: 'Pass', AA: 'Pass', AAALarge: 'Pass', AAA: 'Pass' };
  } else if (contrast > 4.5) {
    return { AALarge: 'Pass', AA: 'Pass', AAALarge: 'Pass', AAA: 'Fail' };
  } else if (contrast > 3) {
    return { AALarge: 'Pass', AA: 'Fail', AAALarge: 'Fail', AAA: 'Fail' };
  }

  return { AALarge: 'Fail', AA: 'Fail', AAALarge: 'Fail', AAA: 'Fail' };
};

export const updatePath = throttle((bg: number[], fg: number[]) => {
  const backgroundHex = hslToHex(bg).replace(/^#/, '');
  const foregroundHex = hslToHex(fg).replace(/^#/, '');

  if (history !== undefined) {
    history.push(`/${backgroundHex}/${foregroundHex}`);
  }

}, 250);

export const isDark = (hsl: number[]) => chroma.hsl(hsl[0], hsl[1], hsl[2]).get('lab.l') < 60;

export const hexToHsl = (hex: string) => isHex(hex) ? chroma(hex).hsl() : null;

export const hslToHex = (hsl: number[]) => isHsl(hsl) ? chroma.hsl(hsl[0], hsl[1], hsl[2]).hex() : '#808080';

export const hexToRgb = (hex: string) => isHex(hex) ? chroma(hex).rgb() : null;

export const rgbToHex = (rgb: number[]) => isRgb(rgb) ? chroma.rgb(rgb[0], rgb[1], rgb[2]).hex() : '#808080';

export const getContrast = (a: number[], b: number[]) => chroma.contrast(rgbToHex(a), rgbToHex(b));

export const getRandomColor = () => chroma.random().hsl();

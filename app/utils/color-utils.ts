import chroma from 'chroma-js';

import type { TLevels } from '~/global-types';

export const isHex = (hex: string): boolean => {
	try {
		const color = chroma(hex);
		return !!color;
	} catch (err) {
		return false;
	}
};

export const isHsl = (hsl: number[]): boolean => {
	try {
		const color = chroma.hsl(hsl[0], hsl[1], hsl[2]);
		return !!color;
	} catch (e) {
		return false;
	}
};

export const isRgb = (rgb: number[]): boolean => {
	try {
		const color = chroma.rgb(rgb[0], rgb[1], rgb[2]);
		return !!color;
	} catch (e) {
		return false;
	}
};

export const isDark = (hsl: number[]): boolean => {
	return chroma.hsl(hsl[0], hsl[1], hsl[2]).get('lab.l') < 60;
};

export const colorToHsl = (hex: string): [number, number, number] => {
	return chroma(hex).hsl();
};

export const hslToHex = (hsl: number[]): string => {
	return chroma.hsl(hsl[0], hsl[1], hsl[2]).hex();
};

export const hslToRgb = (hsl: number[]): [number, number, number] => {
	return chroma.hsl(hsl[0], hsl[1], hsl[2]).rgb();
};

export const rgbToHsl = (rgb: number[]): [number, number, number] => {
	return chroma.rgb(rgb[0], rgb[1], rgb[2]).hsl();
};

export const getContrast = (bg: string, fg: string): number => {
	return chroma.contrast(bg, fg);
};

export const getColorValue = (
	path: string | null,
	fallback: string,
): [number, number, number] => {
	const isPathAndHex = path && isHex(path);
	const value = colorToHsl(isPathAndHex ? path : fallback);

	return value;
};

export const getLevel = (contrast: number): TLevels => {
	if (contrast > 7) {
		return { AALarge: 'Pass', AA: 'Pass', AAALarge: 'Pass', AAA: 'Pass' };
	} else if (contrast > 4.5) {
		return { AALarge: 'Pass', AA: 'Pass', AAALarge: 'Pass', AAA: 'Fail' };
	} else if (contrast > 3) {
		return { AALarge: 'Pass', AA: 'Fail', AAALarge: 'Fail', AAA: 'Fail' };
	}

	return { AALarge: 'Fail', AA: 'Fail', AAALarge: 'Fail', AAA: 'Fail' };
};

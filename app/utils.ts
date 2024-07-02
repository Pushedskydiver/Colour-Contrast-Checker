import chroma from 'chroma-js';

import type { TLevels } from './global-types';

export const fetchData = async <T>(api: string): Promise<T> => {
	const response = await fetch(api);
	const body = await response.json();

	if (response.status !== 200) {
		throw new Error(`Error: ${body.message}`);
	}

	return body;
};

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

export const isDark = (hsl: number[]): boolean => {
	return chroma.hsl(hsl[0], hsl[1], hsl[2]).get('lab.l') < 60
};

export const hexToHsl = (hex: string): [number, number, number] | null => {
	return isHex(hex) ? chroma(hex).hsl() : null
};

export const hslToHex = (hsl: number[]): string => {
	return isHsl(hsl) ? chroma.hsl(hsl[0], hsl[1], hsl[2]).hex() : '#808080'
};

export const getContrast = (bg: string, fg: string): number => {
	return chroma.contrast(bg, fg)
};

export const getRandomColor = (): [number, number, number] => {
	return chroma.random().hsl();
}

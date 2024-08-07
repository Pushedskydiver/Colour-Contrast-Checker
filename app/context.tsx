import { createContext, useContext, useState } from 'react';
import { useSearchParams } from '@remix-run/react';

import { getCookie, setCookie } from './services/cookies';
import {
	getContrast,
	getLevel,
	hslToHex,
	isDark,
	isHex,
} from './utils/color-utils';

import type { TColors, TLevels } from './global-types';

export type TColourContrastContext = {
	background: number[];
	foreground: number[];
	colors: TColors[];
	contrast: number;
	level: TLevels;
	isBackgroundDark: boolean;
	isPoorContrast: boolean;
	handleContrastCheck: (value: number[], name: string) => void;
	reverseColors: () => void;
	saveColors: () => void;
	setColors: React.Dispatch<React.SetStateAction<TColors[]>>;
	updatePath: (params: string) => void;
	updateView: (bg: number[], fg: number[]) => void;
};

export type TColourContrastProvider = {
	background: number[];
	foreground: number[];
	colors: TColors[];
	contrast: number;
	levels: TLevels;
	children: React.ReactNode;
};

const ColourContrastContext = createContext<TColourContrastContext | undefined>(
	undefined,
);

const ColourContrastProvider: React.FC<TColourContrastProvider> = ({
	background: storedBg,
	foreground: storedFg,
	colors: storedColors,
	contrast: storedContrast,
	levels: storedLevels,
	children,
}): JSX.Element | null => {
	const [, setSearchParams] = useSearchParams();

	const [colors, setColors] = useState(storedColors);
	const [background, setBackground] = useState(storedBg);
	const [foreground, setForeground] = useState(storedFg);
	const [contrast, setContrast] = useState(storedContrast);
	const [level, setLevel] = useState(storedLevels);

	const isBackgroundDark = isDark(background ?? [49.73, 1, 0.71, 1]);
	const isPoorContrast = contrast < 3;

	function checkContrast(bg: string, fg: string): void {
		const isBgHex = isHex(bg);
		const isFgHex = isHex(fg);

		if (!isBgHex || !isFgHex) return;

		const newContrast = getContrast(bg, fg);
		const newLevel = getLevel(newContrast);

		setContrast(newContrast);
		setLevel(newLevel);
	}

	function handleContrastCheck(value: number[], name: string): void {
		const isBackground = name === 'background';
		const isForeground = name === 'foreground';

		const bg = isBackground ? hslToHex(value) : hslToHex(background);
		const fg = isForeground ? hslToHex(value) : hslToHex(foreground);

		if (isBackground) setBackground(value);
		if (isForeground) setForeground(value);

		checkContrast(bg, fg);
	}

	function saveColors(): void {
		const storedColors = getCookie('colors');
		const colors: TColors[] = storedColors ? JSON.parse(storedColors) : [];
		const bg = hslToHex(background);
		const fg = hslToHex(foreground);
		const sameColors = colors.some(
			(color) => color.background === bg && color.foreground === fg,
		);

		if (colors.length > 0 && sameColors) return;
		if (colors.length > 5) colors.pop();

		colors.unshift({ background: bg, foreground: fg });

		setCookie('colors', JSON.stringify(colors), 2860146);
		setColors(colors);
	}

	function updateView(bg: number[], fg: number[]): void {
		const bgHex = hslToHex(bg);
		const fgHex = hslToHex(fg);
		const bgParam = bgHex.replace(/^#/, '');
		const fgParam = fgHex.replace(/^#/, '');

		const params = `background=${bgParam}&foreground=${fgParam}`;

		checkContrast(bgHex, fgHex);
		setBackground(bg);
		setForeground(fg);

		updatePath(params);
	}

	const updatePath = (params: string): void => {
		setSearchParams(params, { preventScrollReset: true });
	};

	function reverseColors(): void {
		updateView(foreground, background);
	}

	return (
		<ColourContrastContext.Provider
			value={{
				colors,
				background,
				foreground,
				contrast,
				level,
				isBackgroundDark,
				isPoorContrast,
				handleContrastCheck,
				reverseColors,
				saveColors,
				setColors,
				updatePath,
				updateView,
			}}
		>
			{children}
		</ColourContrastContext.Provider>
	);
};

const useColourContrast = (): TColourContrastContext => {
	const context = useContext(ColourContrastContext);

	if (context === undefined) {
		throw new Error(
			'useColourContrast must be used within a ColourContrastProvider',
		);
	}

	return context;
};

export { ColourContrastContext, useColourContrast };

export default ColourContrastProvider;

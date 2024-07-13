import { useEffect, useRef } from 'react';
import round from 'lodash.round';
import { useColourContrast } from '~/context';
import { hslToHex, hslToRgb, rgbToHsl } from '~/utils/color-utils';
import { RangeInput } from '~/components/01-atoms/range-input/range-input';

import styles from './color-control.module.css';

const nanH = (h: number): number => (Number.isNaN(h) || h === null ? 0 : h);

export type TColourControl = {
	id: string;
	type?: 'hsl' | 'rgb';
};

export const ColourControl: React.FC<TColourControl> = ({ id, type }) => {
	const { background, foreground, handleContrastCheck, updatePath } =
		useColourContrast();

	const refA = useRef<HTMLInputElement>(null);
	const refB = useRef<HTMLInputElement>(null);
	const refC = useRef<HTMLInputElement>(null);

	const backgroundRef = useRef(background);
	const foregroundRef = useRef(foreground);

	const isRgb = type === 'rgb';
	const bg = isRgb ? hslToRgb(background) : background;
	const fg = isRgb ? hslToRgb(foreground) : foreground;

	const value = id === 'background' ? bg : fg;
	const valueA = isRgb ? value[0] : round(nanH(value[0]));
	const valueB = isRgb ? value[1] : round(value[1], 2.5);
	const valueC = isRgb ? value[2] : round(value[2], 2);
	const labelTextA = isRgb ? `Red ${valueA}` : `Hue ${valueA}°`;
	const labelTextB = isRgb ? `Green ${valueB}` : `Saturation ${valueB}`;
	const labelTextC = isRgb ? `Blue ${valueC}` : `Lightness ${valueC}`;

	const handleOnInput = (e: React.FormEvent<HTMLInputElement>): void => {
		const abc = [...value];
		const property = e.currentTarget.getAttribute('data-property');

		if (!property) return;

		abc[parseFloat(property)] = parseFloat(e.currentTarget.value);

		const colorValue = isRgb ? rgbToHsl(abc) : abc;

		handleContrastCheck(colorValue, id);
	};

	const handleOnChange = (): void => {
		const bgHex = hslToHex(backgroundRef.current);
		const fgHex = hslToHex(foregroundRef.current);
		const bgParam = bgHex.replace(/^#/, '');
		const fgParam = fgHex.replace(/^#/, '');

		const params = `background=${bgParam}&foreground=${fgParam}`;

		updatePath(params);
	};

	useEffect(() => {
		backgroundRef.current = background;
		foregroundRef.current = foreground;
	}, [background, foreground]);

	useEffect(() => {
		const currentRefA = refA.current;
		const currentRefB = refB.current;
		const currentRefC = refC.current;

		if (currentRefA) currentRefA.addEventListener('change', handleOnChange);
		if (currentRefB) currentRefB.addEventListener('change', handleOnChange);
		if (currentRefC) currentRefC.addEventListener('change', handleOnChange);

		return () => {
			if (currentRefA) {
				currentRefA.removeEventListener('change', handleOnChange);
			}

			if (currentRefB) {
				currentRefB.removeEventListener('change', handleOnChange);
			}

			if (currentRefC) {
				currentRefC.removeEventListener('change', handleOnChange);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.control}>
			<RangeInput
				id={`${id}${isRgb ? 'Red' : 'Hue'}`}
				labelText={labelTextA}
				max={isRgb ? '255' : '360'}
				step={isRgb ? 1 : undefined}
				value={valueA}
				property="0"
				onInput={handleOnInput}
				ref={refA}
			/>

			<RangeInput
				id={`${id}${isRgb ? 'Blue' : 'Saturation'}`}
				labelText={labelTextB}
				max={isRgb ? '255' : '1'}
				step={isRgb ? 1 : 1 / 256}
				value={valueB}
				property="1"
				onInput={handleOnInput}
				ref={refB}
			/>

			<RangeInput
				id={`${id}${isRgb ? 'Green' : 'Lightness'}`}
				labelText={labelTextC}
				max={isRgb ? '255' : '1'}
				step={isRgb ? 1 : 1 / 256}
				value={valueC}
				property="2"
				onInput={handleOnInput}
				ref={refC}
			/>
		</div>
	);
};

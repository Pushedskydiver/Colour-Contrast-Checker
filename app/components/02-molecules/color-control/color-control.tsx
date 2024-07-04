import round from 'lodash.round';
import { useColourContrast } from '~/context';
import { RangeInput } from '~/components/01-atoms/range-input/range-input';

import styles from './color-control.module.css';
import { hslToRgb, rgbToHsl } from '~/utils/color-utils';

const nanH = (h: number): number => (Number.isNaN(h) || h === null ? 0 : h);

export type TColourControl = {
	id: string;
	type?: 'hsl' | 'rgb';
}

export const ColourControl: React.FC<TColourControl> = ({ id, type }) => {
	const { background, foreground, handleContrastCheck } = useColourContrast();

	const isRgb = type === 'rgb';
	const bg = isRgb ? hslToRgb(background) : background;
	const fg = isRgb ? hslToRgb(foreground) : foreground;

	const value = id === 'background' ? bg :  fg;
	const valueA = isRgb ? value[0] : round(nanH(value[0]));
	const valueB = isRgb ? value[1] : round(value[1], 2.5);
	const valueC = isRgb ? value[2] : round(value[2], 2);
	const labelTextA = isRgb ? `Red ${valueA}` : `Hue ${valueA}°`;
	const labelTextB = isRgb ? `Blue ${valueB}` : `Saturation ${valueB}`;
	const labelTextC = isRgb ? `Green ${valueC}` : `Lightness ${valueC}`;

	// console.log({ id, value, valueA, valueB, valueC });
	
	const handleChange = ({ target }: { target: HTMLInputElement }): void => {
		const abc = [...value];
		const property = target.getAttribute('property');
		
		if (!property) return;

		abc[parseFloat(property)] = parseFloat(target.value);

		const colorValue = isRgb ? rgbToHsl(abc) : abc;

		handleContrastCheck(colorValue, id);
	}

	return (
		<div className={styles.control}>
			<RangeInput
				id={`${id}${isRgb ? 'Red' : 'Hue'}`}
				labelText={labelTextA}
				max={isRgb ? '255' : '360'}
				property="0"
				step={isRgb ? 1 : undefined}
				value={valueA}
				onChange={handleChange}
			/>

			<RangeInput
				id={`${id}${isRgb ? 'Blue' : 'Saturation'}`}
				labelText={labelTextB}
				max={isRgb ? '255' : '1'}
				step={isRgb ? 1 : 1 / 256}
				value={valueB}
				onChange={handleChange}
				property="1"
			/>

			<RangeInput
				id={`${id}${isRgb ? 'Green' : 'Lightness'}`}
				labelText={labelTextC}
				max={isRgb ? '255' : '1'}
				property="2"
				step={isRgb ? 1 : 1 / 256}
				value={valueC}
				onChange={handleChange}
			/>
		</div>
	)
}

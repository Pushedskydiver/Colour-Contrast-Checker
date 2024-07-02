import clsx from 'clsx';
import { useColourContrast } from '~/context';
import { Text } from '../text/text';

import styles from './range-input.module.css';

export type TRangeInput = {
	id: string;
	labelText: string;
} & Pick<React.ComponentProps<'input'>, 'max' | 'name' | 'property' | 'step' | 'value' | 'onChange'>;

export const RangeInput: React.FC<TRangeInput> = ({
	id,
	labelText,
	max,
	name,
	property,
	step,
	value,
	onChange,
}) => {
	const { isBackgroundDark, isPoorContrast } = useColourContrast();

	return (
		<div className={styles.field}>
			<label
				htmlFor={id}
				className={clsx(
					styles.label,
					isPoorContrast && !isBackgroundDark ? styles.labelDark : undefined,
					isPoorContrast && isBackgroundDark ? styles.labelLight : undefined,
				)}
			>
				<Text
					size="pulse"
					weight="medium"
					role="presentation"
				>
					{labelText}
				</Text>
			</label>

			<input
				id={id}
				type="range"
				max={max}
				name={name ?? id}
				property={property}
				step={step}
				value={value}
				onChange={onChange}
				className={clsx(
					styles.input,
					isPoorContrast && !isBackgroundDark ? styles.inputDark : undefined,
					isPoorContrast && isBackgroundDark ? styles.inputLight : undefined,
				)}
			/>
		</div>
	)
}

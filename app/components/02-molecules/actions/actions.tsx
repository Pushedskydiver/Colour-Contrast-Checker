import { useColourContrast } from '~/context';
import { Button, CtaContent } from '~/components/01-atoms/cta/cta';
import { ColorSwatch } from '~/components/01-atoms/color-swatch/color-swatch';

import styles from './actions.module.css';

import type { TColors } from '~/global-types';

export const Actions: React.FC = () => {
	const { colors, reverseColors, saveColors } = useColourContrast();

	const renderSwatch = (swatch: TColors, i: number): JSX.Element => (
		<ColorSwatch
			key={`${swatch.background}-${swatch.foreground}-${i}`}
			background={swatch.background}
			foreground={swatch.foreground}
		/>
	);

	return (
		<div className={styles.actions}>
			<Button
				type="button"
				onClick={reverseColors}
				className={styles.cta}
			>
				<CtaContent.Text>Reverse colours</CtaContent.Text>
			</Button>

			<Button type="button" onClick={saveColors} className={styles.cta}>
				<CtaContent.Text>Save colours</CtaContent.Text>
			</Button>

			{colors.length > 0 ? (
				<ul className={styles.swatches} aria-label="Saved colours">
					{colors.map(renderSwatch)}
				</ul>
			) : null}
		</div>
	);
};

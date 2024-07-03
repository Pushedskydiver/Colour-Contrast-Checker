import { useEffect, useState } from 'react';
import { fetchData } from '~/utils/misc-utils';

import { Select } from '~/components/01-atoms/select/select';

import styles from './typeface.module.css';

import type { TGoogleWebfontList, TGoogleWebfontFamily } from '~/global-types';
import type { TSelectOption } from '~/components/01-atoms/select/select';

export type TTypeface = {
	GOOGLE_FONTS_APIKEY: string;
}

export const Typeface: React.FC<TTypeface> = ({ GOOGLE_FONTS_APIKEY }) => {
	const GOOGLE_FONTS_ENDPOINT = `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_APIKEY}&sort=popularity`;

	const [fontOptions, setFontOptions] = useState<TSelectOption[]>([]);

	const mapFont = (font: TGoogleWebfontFamily): TSelectOption => ({
		text: font.family,
		value: font.family,
	})

	const getGoogleFonts = async (): Promise<void> => {
		const googleFonts = await fetchData<TGoogleWebfontList>(GOOGLE_FONTS_ENDPOINT);
		const slicedFonts = googleFonts.items.slice(0, 50);
		const mappedFonts = slicedFonts.map(mapFont);

		setFontOptions(mappedFonts);
	}

	const handleOnChange = async (
		e: React.ChangeEvent<HTMLSelectElement>
	): Promise<void> => {
		const target = e.currentTarget;
		const head = document.querySelector('head') as HTMLHeadElement;
		const fontLinkTag = head.querySelector('link[href*="fonts.googleapis.com"]');
		const option = target.options[target.selectedIndex];
		const font = option.value;
		const webfont = await import('webfontloader');

		webfont.load({
			google: { families: [`${font}`] },
			fontloading: () => {
				document.documentElement.className = '';
				if (fontLinkTag !== null) head.removeChild(fontLinkTag);
			},
			fontactive: () => {
				document.body.style.setProperty('--copy', `${font}, sans-serif`);
			}
		});
	}

	useEffect(() => {
		getGoogleFonts();
	}, [])

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<Select
					id="google-font"
					labelText="Typeface"
					defaultValue="Select Google font"
					options={fontOptions}
					className={styles.select}
					onChange={handleOnChange}
				/>
			</div>
		</section>
	)
}

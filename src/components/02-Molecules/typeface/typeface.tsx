import { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
import { fetchData } from '~/components/Utils';
import { Select } from '~/components/01-Atoms/select/select';

import styles from './typeface.module.css';

import type { TGoogleWebfontList, TGoogleWebfontFamily } from '~/global-types';
import type { TSelectOption } from '~/components/01-Atoms/select/select';

const GOOGLE_FONTS_APIKEY = process.env.REACT_APP_GOOGLE_FONT_API_KEY;
const GOOGLE_FONTS_ENDPOINT = `https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_APIKEY}&sort=popularity`;

export const Typeface: React.FC = () => {
  const storedFonts = sessionStorage.getItem('fonts');
  const fontsData = storedFonts ? JSON.parse(storedFonts) : [];
  const [fontOptions, setFontOptions] = useState<TSelectOption[]>(fontsData);

  const mapFont = (font: TGoogleWebfontFamily): TSelectOption => ({
    text: font.family,
    value: font.family,
  })

  const getGoogleFonts = async (): Promise<void> => {
    const googleFonts = await fetchData<TGoogleWebfontList>(GOOGLE_FONTS_ENDPOINT);
    const slicedFonts = googleFonts.items.slice(0, 50);
    const mappedFonts = slicedFonts.map(mapFont);

    sessionStorage.setItem('fonts', JSON.stringify(mappedFonts));

    setFontOptions(mappedFonts);
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const target = e.currentTarget;
    const head = document.querySelector('head') as HTMLHeadElement;
    const fontLinkTag = head.querySelector('link[rel="stylesheet"]');
    const option = target.options[target.selectedIndex];
    const font = option.value;

    WebFont.load({
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
    if (!storedFonts) {
      getGoogleFonts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

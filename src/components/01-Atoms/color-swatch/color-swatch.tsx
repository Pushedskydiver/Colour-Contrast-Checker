import { useColourContrast } from '~/components/Context';
import { hexToHsl, isDark } from '~/components/Utils';
import { Text } from "../text/text";

import styles from './color-swatch.module.css';
import clsx from 'clsx';

export type TColorSwatch = {
  background: string;
  foreground: string;
}

export const ColorSwatch: React.FC<TColorSwatch> = ({
  background,
  foreground,
}) => {
  const { background: bgHsl, contrast, updateView, updatePath } = useColourContrast();
  const isPoorContrast = contrast < 3;
  const isBackgroundDark = isDark(bgHsl);

  const applyColors = (): void => {
    const bg = hexToHsl(background);
    const fg = hexToHsl(foreground);

    if (bg && fg) {
      updateView(bg, fg);
      updatePath(bg, fg);
    }
  }

  return (
    <button
      type="button"
      onClick={applyColors}
      aria-label={`Background = ${background}. Foreground = ${foreground}. Select to apply these colours.`}
      style={{
        backgroundColor: background,
        color: foreground,
        border: `2px solid ${foreground}`,
      }}
      className={clsx(
        styles.swatch,
        isPoorContrast && !isBackgroundDark ? styles.swatchDark : undefined,
        isPoorContrast && isBackgroundDark ? styles.swatchLight : undefined,
      )}
    >
      <Text size="script" weight="semiBold" role="presentation">Aa</Text>
    </button>
  )
}

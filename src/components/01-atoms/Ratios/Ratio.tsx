import clsx from 'clsx';
import { useColourContrast } from '~/components/context';
import { isDark } from '~/components/utils';
import { Text } from '../text/text';

import styles from './ratio.module.css';

export const Ratio: React.FC = () => {
  const { background, contrast } = useColourContrast();
  const isPoorContrast = contrast < 3;
  const isBackgroundDark = isDark(background);

  return (
    <Text
      id="ratio"
      size="horizon"
      weight="semiBold"
      className={clsx(
        styles.ratio,
        isPoorContrast && !isBackgroundDark ? styles.ratioDark : undefined,
        isPoorContrast && isBackgroundDark ? styles.ratioLight : undefined,
      )}
    >
      {contrast.toFixed(2)}
    </Text>
  );
}

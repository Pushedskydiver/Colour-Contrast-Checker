import clsx from 'clsx';
import { useColourContrast } from '~/components/contexts';
import { isDark } from '~/components/utils';

import styles from './divider.module.css';

export const Divider: React.FC = () => {
  const { background, contrast } = useColourContrast();
  const isPoorContrast = contrast < 3;
  const isBackgroundDark = isDark(background);

  return (
    <div className={styles.container}>
      <hr
        className={clsx(
          styles.divider,
          isPoorContrast && !isBackgroundDark ? styles.dividerDark : undefined,
          isPoorContrast && isBackgroundDark ? styles.dividerLight : undefined,
        )}
      />
    </div>
  )
}

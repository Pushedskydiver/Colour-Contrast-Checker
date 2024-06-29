import clsx from 'clsx';
import { useColourContrast } from '~/components/context';

import styles from './divider.module.css';

export const Divider: React.FC = () => {
  const { isBackgroundDark, isPoorContrast } = useColourContrast();

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

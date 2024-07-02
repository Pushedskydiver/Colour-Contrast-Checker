import clsx from 'clsx';
import { useColourContrast } from '~/context';
import { Cross, Tick } from '../icon/icon';
import { Text } from '../text/text';

import styles from './badge.module.css';

export type TBadge = {
  type: 'AA Large' | 'AAA Large' | 'AA Normal' | 'AAA Normal';
  grade: 'Pass' | 'Fail';
  children: React.ReactNode;
}

export const Badge: React.FC<TBadge> = ({ grade, type, children }) => {
  const { isBackgroundDark, isPoorContrast } = useColourContrast();
  const isPass = grade === 'Pass';

  return (
    <>
      <Text
        size="script"
        weight="medium"
        role="presentation"
        className={clsx(
          styles.badge,
          isPoorContrast && !isBackgroundDark ? styles.badgeDark : undefined,
          isPoorContrast && isBackgroundDark ? styles.badgeLight : undefined,
        )}
      >
        <span className={styles.badgeContent} role="presentation">{children}</span>

        {isPass ? <Tick /> : <Cross />}
      </Text>

      <Text
        size="script"
        weight="medium"
        role="presentation"
        className={clsx(
          styles.badgeText,
          isPoorContrast && !isBackgroundDark ? styles.badgeTextDark : undefined,
          isPoorContrast && isBackgroundDark ? styles.badgeTextLight : undefined,
        )}
      >
        {type}
      </Text>
    </>
  )
}

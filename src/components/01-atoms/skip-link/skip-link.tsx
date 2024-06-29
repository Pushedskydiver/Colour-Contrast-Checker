import clsx from 'clsx';
import { useColourContrast } from '~/components/context';

import styles from './skip-link.module.css';

export type TSkipLink = {
  href: string;
  bodyText: string;
}

export const SkipLink: React.FC<TSkipLink> = ({ href, bodyText }) => {
  const { isBackgroundDark, isPoorContrast } = useColourContrast();

  return (
    <a
      href={href}
      className={clsx(
        styles.link,
        isPoorContrast && !isBackgroundDark ? styles.linkDark : undefined,
        isPoorContrast && isBackgroundDark ? styles.linkLight : undefined,
      )}
    >
      {bodyText}
    </a>
  )
}

import clsx from 'clsx';
import { useColourContrast } from '~/components/context';
import { GitHub, Twitter } from '~/components/01-atoms/icon/icon';
import { Text } from '~/components/01-atoms/text/text';

import styles from './footer.module.css';

export const Footer: React.FC = () => {
  const { isBackgroundDark, isPoorContrast } = useColourContrast();

  return (
    <footer
      className={clsx(
        styles.footer,
        isPoorContrast && !isBackgroundDark ? styles.footerDark : undefined,
        isPoorContrast && isBackgroundDark ? styles.footerLight : undefined,
      )}
    >
      <div className={styles.container}>
        <ul
          aria-label="Social media links"
          className={styles.list}
        >
          <li>
            <a
              href="https://github.com/Pushedskydiver/Colour-Contrast-Checker"
              aria-label="Colour contrast checker GitHub project"
              rel="external"
            >
              <GitHub />
            </a>
          </li>

          <li>
            <a
              href="https://twitter.com/alexmclapperton"
              aria-label="Alex's Twitter profile"
              rel="external"
            >
              <Twitter />
            </a>
          </li>
        </ul>

        <Text
          tag="p"
          weight="medium"
          className={styles.footnote}
        >
          UI created by <a href="https://www.willtarpey.com/" rel="external">Will Tarpey</a>. Thank you Will ❤️
        </Text>
      </div>
    </footer>
  )
}

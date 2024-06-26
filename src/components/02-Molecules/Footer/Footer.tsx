import clsx from 'clsx';
import { useColourContrast } from '~/components/Context';
import { isDark } from '~/components/Utils';
import { GitHub, Twitter } from '~/components/01-Atoms/Icon/Icon';
import { Text } from '~/components/01-Atoms/text/text';

import styles from './footer.module.css';

export const Footer: React.FC = () => {
  const { background, contrast } = useColourContrast();
  const isPoorContrast = contrast < 3;
  const isBackgroundDark = isDark(background);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <ul className={styles.list} aria-label="Social media links">
          <li>
            <a
              href="https://github.com/Pushedskydiver/Colour-Contrast-Checker"
              aria-label="GitHub project"
            >
              <GitHub />
            </a>
          </li>

          <li>
            <a
              href="https://twitter.com/alexmclapperton"
              title="Alex's Twitter profile"
            >
              <Twitter />
            </a>
          </li>
        </ul>

        <Text
          tag="p"
          weight="medium"
          className={clsx(
            styles.footnote,
            isPoorContrast && !isBackgroundDark ? styles.footnoteDark : undefined,
            isPoorContrast && isBackgroundDark ? styles.footnoteLight : undefined,
          )}
        >
          UI created by <a href="https://www.willtarpey.com/" rel="external">Will Tarpey</a>. Thank you Will ❤️
        </Text>
      </div>
    </footer>
  );
}

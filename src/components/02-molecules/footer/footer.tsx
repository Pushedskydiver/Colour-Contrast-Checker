import { GitHub, Twitter } from '~/components/01-atoms/Icons/icon';
import { Text } from '~/components/01-atomss/text/text';

import styles from './footer.module.css';

export const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <ul
        aria-label="Social media links"
        className={styles.list}
      >
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
        className={styles.footnote}
      >
        UI created by <a href="https://www.willtarpey.com/" rel="external">Will Tarpey</a>. Thank you Will ❤️
      </Text>
    </div>
  </footer>
);

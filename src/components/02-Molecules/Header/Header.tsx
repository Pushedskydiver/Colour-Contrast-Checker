import { Text } from '~/components/01-Atoms/text/text';
import { BuyMeACoffeeCTA } from '~/components/01-Atoms/bmc-cta/bmc-cta';
import { ChromeWebStoreCta } from '~/components/01-Atoms/cws-cta/cws-cta';
import { SkipLink } from '~/components/01-Atoms/skip-link/skip-link';

import styles from './header.module.css';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <SkipLink href="#ratio" bodyText="Skip to colour contrast ratio" />
        <SkipLink href="#grades" bodyText="Skip to colour contrast grades" />
        <SkipLink href="#background" bodyText="Skip to background colour input" />
        <SkipLink href="#foreground" bodyText="Skip to foreground colour input" />
        <SkipLink href="#largeCopy" bodyText="Skip to large text example copy" />
        <SkipLink href="#normalCopy" bodyText="Skip to normal text example copy" />

        <Text
          tag="h1"
          size="landmark"
          weight="semiBold"
          className={styles.title}
        >
          Colour contrast checker
        </Text>

        <div className={styles.meta}>
          <BuyMeACoffeeCTA />

          <ChromeWebStoreCta />
        </div>
      </div>
    </header>
  );
}

import clsx from "clsx";
import { useColourContrast } from '~/components/context';

import styles from './cws-cta.module.css';

export const ChromeWebStoreCta: React.FC = () => {
  const { isBackgroundDark, isPoorContrast } = useColourContrast();

  return (
    <a
      href="https://chrome.google.com/webstore/detail/colour-contrast-checker/nmmjeclfkgjdomacpcflgdkgpphpmnfe"
      aria-label="Available in the Chrome Web Store"
      rel="external"
      className={clsx(
        styles.cta,
        isPoorContrast && !isBackgroundDark ? styles.ctaDark : undefined,
        isPoorContrast && isBackgroundDark ? styles.ctaLight : undefined,
      )}
    >
      <img src="/images/logos/chrome-webstore-badge.png" alt="Chrome webstore badge" loading="eager" width="200" height="60" />
    </a>
  )
}

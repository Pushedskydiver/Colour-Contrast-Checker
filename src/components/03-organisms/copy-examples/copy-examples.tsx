import clsx from 'clsx';
import { useColourContrast } from '~/components/context';
import { isDark } from '~/components/utils';
import { Text } from '~/components/01-atoms/text/text';
import { Example } from '~/components/02-molecules/example/example';

import styles from './copy-examples.module.css';

export const CopyExamples: React.FC = () => {
  const { background, contrast } = useColourContrast();
  const isPoorContrast = contrast < 3;
  const isBackgroundDark = isDark(background);

  return (
    <section aria-labelledby="copy-examples-heading">
      <div className={styles.container}>
        <Text
          id="copy-examples-heading"
          tag="h2"
          size="landmark"
          weight="semiBold"
          className={clsx(
            styles.title,
            isPoorContrast && !isBackgroundDark ? styles.titleDark : undefined,
            isPoorContrast && isBackgroundDark ? styles.titleLight : undefined,
          )}
        >
          Example copy
        </Text>

        <div className={styles.examples}>
          <Example
            id="largeCopy"
            labelText="Large Text - 18pt/24px"
            size="large"
          />

          <Example
            id="normalCopy"
            labelText="Normal Text - 16px"
          />
        </div>
      </div>
    </section>
  )
}

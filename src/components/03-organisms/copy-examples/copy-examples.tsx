import { Text } from '~/components/01-atoms/text/text';
import { Example } from '~/components/02-molecules/example/example';

import styles from './copy-examples.module.css';

export const CopyExamples: React.FC = () => (
  <section aria-labelledby="copy-examples-heading">
    <div className={styles.container}>
      <Text
        id="copy-examples-heading"
        tag="h2"
        size="landmark"
        weight="semiBold"
        className={styles.title}
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

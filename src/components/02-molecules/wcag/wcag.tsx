import { useColourContrast } from '~/components/context';
import { Badge } from '~/components/01-atomss/badge/badge';

import styles from './wcag.module.css';

export interface WcagProps {
  id: string
}

export const  Wcag: React.FC<WcagProps> = ({ id }) => {
  const { level } = useColourContrast();
  const { AALarge, AAALarge, AA, AAA } = level;

  return (
    <ul
      className={styles.list}
      aria-label="Colour contrast grades"
      id={id}
    >
      <li
        className={styles.item}
        aria-live="polite"
        aria-label={`AA Large. ${AALarge === 'Pass' ? 'Pass' : 'Fail'}`}
      >
        <Badge grade={AALarge} type="AA Large">{AALarge}</Badge>
      </li>

      <li
        className={styles.item}
        aria-live="polite"
        aria-label={`AAA Large. ${AAALarge}`}
      >
        <Badge grade={AAALarge} type="AAA Large">{AAALarge}</Badge>
      </li>

      <li
        className={styles.item}
        aria-live="polite"
        aria-label={`AA. ${AA}`}
      >
        <Badge grade={AA} type="AA Normal">{AA}</Badge>
      </li>

      <li
        className={styles.item}
        aria-live="polite"
        aria-label={`AAA. ${AAA}`}
      >
        <Badge grade={AAA} type="AAA Normal">{AAA}</Badge>
      </li>
    </ul>
  );
}

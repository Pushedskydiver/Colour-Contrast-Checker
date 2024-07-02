import clsx from 'clsx';
import { useColourContrast } from '~/context';
import { Text } from '~/components/01-atoms/text/text';

import styles from './example.module.css';

export type TExample = {
  id: string;
  labelText: string;
  size?: 'large' | 'normal';
}

export const Example: React.FC<TExample> = ({ id, labelText, size = 'normal' }) => {
  const { isBackgroundDark, isPoorContrast } = useColourContrast();

  const defaultText = 'Click/Tap to edit me. That Biff, what a character. Always trying to get away with something. Been on top of Biff ever since high school. Although, if it wasn\'t for him - Yes, yes, I\'m George, George McFly, and I\'m your density. I mean, I\'m your destiny. Right. Alright, take it up, go. Doc. Something wrong with the starter, so I hid it.';

  return (
    <div
      className={clsx(
        styles.field,
        isPoorContrast && !isBackgroundDark ? styles.fieldDark : undefined,
        isPoorContrast && isBackgroundDark ? styles.fieldLight : undefined,
      )}
    >
      <label htmlFor={id} className={styles.label}>
        <Text
          size="pinnacle"
          weight="semiBold"
          role="presentation"
        >
          {labelText}
        </Text>
      </label>

      <textarea
        id={id}
        rows={5}
        className={clsx(
          styles.textarea,
          styles[`${size}Textarea`],
        )}
        placeholder={defaultText}
      />
    </div>
  )
}

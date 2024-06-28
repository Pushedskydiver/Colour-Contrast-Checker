import clsx from 'clsx';
import { useColourContrast } from '~/components/context';
import { isDark } from '~/components/utils';
import { Text } from '~/components/01-atoms/text/text';

import styles from './example.module.css';

export type TExample = {
  id: string;
  labelText: string;
  size?: 'large' | 'normal';
}

export const Example: React.FC<TExample> = ({ id, labelText, size = 'normal' }) => {
  const { background, contrast } = useColourContrast();
  const isPoorContrast = contrast < 3;
  const isBackgroundDark = isDark(background);

  const defaultText = 'Click/Tap to edit me. That Biff, what a character. Always trying to get away with something. Been on top of Biff ever since high school. Although, if it wasn\'t for him - Yes, yes, I\'m George, George McFly, and I\'m your density. I mean, I\'m your destiny. Right. Alright, take it up, go. Doc. Something wrong with the starter, so I hid it.';

  const checkDataInput = (
    e: React.FocusEvent<HTMLTextAreaElement, Element>
  ): void => {
    const target = e.target;

    if (target.value.length === 0) {
      target.value = defaultText;
    }
  }

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
        onBlur={checkDataInput}
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

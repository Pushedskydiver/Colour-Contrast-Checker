import clsx from 'clsx';
import { useColourContrast } from '~/components/context';
import { isDark } from '~/components/utils';
import { CopyCta } from '../copy-cta/copy-cta';
import { Text } from '../text/text';

import styles from './text-input.module.css';

export type TTextInput = {
  id: string;
  labelText: string;
  value: string;
} & Pick<React.ComponentProps<'input'>, 'minLength' | 'name' | 'onChange'>;

export const TextInput: React.FC<TTextInput> = ({
  id,
  labelText,
  minLength,
  name,
  value,
  onChange,
}) => {
  const { background, contrast } = useColourContrast();
  const isPoorContrast = contrast < 3;
  const isBackgroundDark = isDark(background);

  return (
    <div className={styles.field}>
      <label
        htmlFor={id}
        className={clsx(
          styles.label,
          isPoorContrast && !isBackgroundDark ? styles.labelDark : undefined,
          isPoorContrast && isBackgroundDark ? styles.labelLight : undefined,
        )}
      >
        <Text
          size="pulse"
          weight="medium"
          role="presentation"
        >
          {labelText}
        </Text>
      </label>

      <Text
        tag="div"
        size="horizon"
        weight="medium"
        className={styles.inputWrapper}
      >
        <input
          id={id}
          type="text"
          minLength={minLength}
          name={name ?? id}
          spellCheck="false"
          value={value}
          onChange={onChange}
          className={clsx(
            styles.input,
            isPoorContrast && !isBackgroundDark ? styles.inputDark : undefined,
            isPoorContrast && isBackgroundDark ? styles.inputLight : undefined,
          )}
        />

        <CopyCta id={`${id}Copy`} value={value} />
      </Text>
    </div>
  )
}

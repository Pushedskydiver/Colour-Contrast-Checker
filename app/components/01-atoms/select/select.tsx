import clsx from 'clsx';
import { useColourContrast } from '~/context';
import { Chevron } from '../icon/icon';
import { Text } from '../text/text';

import styles from './select.module.css';

export type TSelectOption = {
  text: string;
  value: string;
}

export type TSelect = {
  id: string;
  labelText: string;
  options: TSelectOption[];
  defaultValue?: string;
  name?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<TSelect> = ({
  id,
  labelText,
  name,
  defaultValue,
  options,
  className,
  onChange,
}) => {
  const { isBackgroundDark, isPoorContrast } = useColourContrast();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    if (onChange) {
      onChange(e);
    }
  }

  const renderFontOption = (
    option: TSelectOption,
    index: number
  ): JSX.Element => (
    <option key={`${option.value}-${index}`} value={option.value}>
      {option.text}
    </option>
  );

  return (
    <div
      className={clsx(
        styles.field,
        isPoorContrast && !isBackgroundDark ? styles.fieldDark : undefined,
        isPoorContrast && isBackgroundDark ? styles.fieldLight : undefined,
        className,
      )}
    >
      <label htmlFor={id} className={styles.label}>
        <Text
          size="script"
          weight="semiBold"
          role="presentation"
        >
          {labelText}
        </Text>
      </label>

      <div className={styles.selectWrapper}>
        <select
          id={id}
          name={name ?? id}
          defaultValue={defaultValue}
          onChange={handleOnChange}
          className={styles.select}
        >
          {defaultValue ? <option disabled>{defaultValue}</option> : null}

          {options.map(renderFontOption)}
        </select>

        <Chevron className={styles.selectIcon} />
      </div>
    </div>
  );
}

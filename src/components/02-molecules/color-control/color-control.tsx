import round from 'lodash.round';
import { useColourContrast } from '~/components/context';
import { RangeInput } from '~/components/01-atoms/range-input/range-input';

import styles from './color-control.module.css';

export type TColourControl = {
  id: string;
}

export const ColourControl: React.FC<TColourControl> = ({ id }) => {
  const { background, foreground, handleContrastCheck } = useColourContrast();
  const value = id === 'background' ? background : foreground;
  const [h, s, l] = value;

  const nanH = (h: number): number => (Number.isNaN(h) || h === null ? 0 : h);

  const handleChange = ({ target }: { target: HTMLInputElement }): void => {
    const hsl = [...value];
    const property = target.getAttribute('property');

    if (!property) return;

    hsl[parseFloat(property)] = parseFloat(target.value);

    if (handleContrastCheck) {
      handleContrastCheck(hsl, id);
    }
  }

  return (
    <div className={styles.control}>
      <RangeInput
        id={`${id}Hue`}
        labelText={`Hue ${Math.round(nanH(h))}°`}
        max="360"
        property="0"
        value={Math.round(nanH(h))}
        onChange={handleChange}
      />

      <RangeInput
        id={`${id}Saturation`}
        labelText={`Saturation ${round(s, 2.5)}`}
        max="1"
        step={1 / 256}
        value={round(s, 2.5)}
        onChange={handleChange}
        property="1"
      />

      <RangeInput
        id={`${id}Lightness`}
        labelText={`Lightness ${round(l, 2)}`}
        max="1"
        property="2"
        step={1 / 256}
        value={round(l, 2)}
        onChange={handleChange}
      />
    </div>
  )
}

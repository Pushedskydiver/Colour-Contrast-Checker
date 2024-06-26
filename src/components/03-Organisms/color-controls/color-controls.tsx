import { ColourControl } from '~/components/02-Molecules/color-control/color-control';
import { useColourContrast } from '~/components/Context';
import { hexToHsl, hslToHex, isHex } from '~/components/Utils';
import { TextInput } from '~/components/01-Atoms/text-input/text-input';

import styles from './color-controls.module.css';
import { useEffect, useState } from 'react';

export const ColorControls: React.FC = () => {
  const { background, foreground, handleContrastCheck } = useColourContrast();
  const [bgValue, setBgValue] = useState(hslToHex(background));
  const [fgValue, setFgValue] = useState(hslToHex(foreground));

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;

    const name = e.target.id;
    const hslValue = hexToHsl(value);
    const valueHasHash = value.indexOf('#') !== -1;
    const isHexCode = isHex(value);
    const isNum = /^\d+$/.test(value);
    const isShortHand = /(^#?[0-9a-f]{3,5}|[0-9a-f]{3])$/gim.test(value);
    const isRed = value.toLowerCase() === 'red';

    if (value.length >= 6 && !valueHasHash && isHexCode && isNum) {
      value = `#${value}`;
    }

    if (value.length <= 3 && !valueHasHash && !isRed) {
      return;
    }

    if (isShortHand && !isRed) {
      return;
    }

    if (value.length < 7 && !isHexCode) {
      return;
    }

    if (!isHexCode) {
      return;
    }

    if (!isShortHand && hslValue) {
      handleContrastCheck(hslValue, name);
    }
  }

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    setBgValue(value);
    handleOnChange(e);
  }

  const handleFgChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    setFgValue(value);
    handleOnChange(e);
  }

  useEffect(() => {
    setBgValue(hslToHex(background));
    setFgValue(hslToHex(foreground));
  }, [background, foreground])

  return (
    <section className={styles.section} aria-label="Colour controls">
      <div className={styles.container}>
        <div className={styles.control}>
          <TextInput
            id="background"
            labelText="Background colour"
            minLength={7}
            value={bgValue}
            onChange={handleBgChange}
          />

          <ColourControl id="background" />
        </div>

        <div className={styles.control}>
          <TextInput
            id="foreground"
            labelText="Foreground colour"
            minLength={7}
            value={fgValue}
            onChange={handleFgChange}
          />

          <ColourControl id="foreground" />
        </div>
      </div>
    </section>
  )
}

import React, { memo, useContext } from 'react';
import round from 'lodash.round';
import Label from '../../01-Atoms/Label/Label.styles';
import Range from '../../01-Atoms/Range/Range.styles';
import ControlStyles from './Controls.styles';
import Context from '../../Context';

export interface ControlsProps {
  id: string,
  name: string
}

function Controls(props: ControlsProps) {
  const nanH = (h: number) => (isNaN(h) || h === null ? 0 : h);
  const { id } = props;
  const { background, foreground, colorState, handleContrastCheck } = useContext(Context);
  const value = id === 'background' ? background : foreground;
  const [h, s, l] = value as number[];

  function handleChange({ target }: { target: HTMLInputElement }) {
    const { name } = props;
    const hsl = [...value as number[]];
    const i = parseFloat(target.getAttribute('property') as string);

    hsl[i] = parseFloat(target.value);

    if (handleContrastCheck) {
      handleContrastCheck(hsl, name);
    }
  }

  return (
    <ControlStyles color={colorState as string}>
      <Label medium htmlFor={`${props.id}Hue`}>
        Hue {Math.round(nanH(h))}°
      </Label>

      <Range
        type="range"
        max="360"
        value={nanH(h)}
        id={`${id}Hue`}
        color={colorState as string}
        onChange={handleChange}
        property="0"
      />

      <Label medium htmlFor={`${id}Saturation`}>
        Saturation {round(s, 2)}
      </Label>

      <Range
        type="range"
        max="1"
        step={1 / 256}
        value={s}
        id={`${id}Saturation`}
        color={colorState as string}
        onChange={handleChange}
        property="1"
      />

      <Label medium htmlFor={`${id}Lightness`}>
        Lightness {round(l, 2)}
      </Label>

      <Range
        type="range"
        max="1"
        step={1 / 256}
        value={l}
        id={`${id}Lightness`}
        color={colorState as string}
        onChange={handleChange}
        property="2"
      />
    </ControlStyles>
  );
}

export default memo(Controls);

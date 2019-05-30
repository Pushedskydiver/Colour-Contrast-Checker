import React, { memo } from 'react';
import round from 'lodash.round';
import Label from '../../01-Atoms/Label/Label.styles';
import Range from '../../01-Atoms/Range/Range.styles';
import ControlStyles from './Controls.styles';

const Controls = (props) => {
  const nanH = h => (isNaN(h) || h === null ? 0 : h);
  const { id, color, value } = props;
  const [h, s, l] = value;

  function handleChange({ target }) {
    const { value, name } = props;
    const hsl = [...value];
    const i = parseFloat(target.getAttribute('property'));

    hsl[i] = parseFloat(target.value);
    props.onChange(hsl, name);
  }

  return (
    <ControlStyles>
      <Label medium htmlFor={`${props.id}Hue`}>
        Hue {Math.round(nanH(h))}°
      </Label>

      <Range
        type="range"
        max="360"
        value={nanH(h)}
        id={`${id}Hue`}
        color={color}
        onChange={handleChange}
        property={0}
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
        color={color}
        onChange={handleChange}
        property={1}
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
        color={color}
        onChange={handleChange}
        property={2}
      />
    </ControlStyles>
  );
};

export default memo(Controls);

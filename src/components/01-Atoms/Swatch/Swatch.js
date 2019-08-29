import React, { Fragment, memo, useContext } from 'react';
import SwatchStyles from './Swatch.styles';
import { Button } from '../Button/Button.styles';
import Context from '../../Context';
import { hexToHsl } from '../../Utils';

function Swatch() {
  const { colors, colorState, reverseColors, saveColors, updateView, updatePath } = useContext(Context);

  function appendColors({ target }) {
    const background = hexToHsl(target.getAttribute('data-background'));
    const foreground = hexToHsl(target.getAttribute('data-foreground'));

    updateView(background, foreground);
    updatePath(background, foreground);
  }

  function renderSwatch({ background, foreground }, index) {
    return (
      <SwatchStyles
        key={index}
        background={background}
        foreground={foreground}
        data-background={background}
        data-foreground={foreground}
        onClick={appendColors}
        aria-label={`Swatch: Background = ${background}. Foreground = ${foreground}. Click/Tap to apply these colour values.`}
      >Aa</SwatchStyles>
    );
  }

  return (
    <Fragment>
      <Button type="button" color={colorState} onClick={reverseColors}>Reverse Colours</Button>
      <Button type="button" color={colorState} onClick={saveColors}>Save Colours</Button>

      {colors.map((color, index) => renderSwatch(color, index))}
    </Fragment>
  );
}

export default memo(Swatch);

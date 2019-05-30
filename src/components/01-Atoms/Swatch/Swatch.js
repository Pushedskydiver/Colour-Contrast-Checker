import React, { memo } from 'react';
import SwatchStyles from './Swatch.styles';

const Swatch = props => (
  <SwatchStyles
    key={props.index}
    background={props.background}
    foreground={props.foreground}
    data-background={props.background}
    data-foreground={props.foreground}
    onClick={props.onClick}
    aria-label={`Swatch: Background = ${props.background}. Foreground = ${props.foreground}. Click/Tap to append these colour values.`}
  >Aa</SwatchStyles>
);

export default memo(Swatch);

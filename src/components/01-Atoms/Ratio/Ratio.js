import React, { memo } from 'react';
import RatioStyles from './Ratio.styles';

const Ratio = props => (
  <RatioStyles id="ratio">{props.contrast.toFixed(2)}</RatioStyles>
);

export default memo(Ratio);

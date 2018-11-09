import React from 'react';
import RatioStyles from './Ratio.styles';

const Ratio = React.memo(props =>
  <RatioStyles id="ratio">{props.contrast.toFixed(2)}</RatioStyles>
);

export default Ratio;

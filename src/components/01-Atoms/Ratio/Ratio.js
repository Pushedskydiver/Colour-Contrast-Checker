import React, { memo, useContext } from 'react';
import RatioStyles from './Ratio.styles';
import Context from '../../Context';

function Ratio() {
  const { contrast } = useContext(Context);

  return <RatioStyles id="ratio">{contrast.toFixed(2)}</RatioStyles>;
}

export default memo(Ratio);

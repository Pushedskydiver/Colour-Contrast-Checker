import { memo } from 'react';
import RatioStyles from './Ratio.styles';
import { useColourContrast } from '../../Context';

function Ratio() {
  const { contrast, colorState } = useColourContrast();

  return (
    <RatioStyles
      color={colorState}
      id="ratio"
    >
      {contrast && contrast.toFixed(2)}
    </RatioStyles>
  );
}

export default memo(Ratio);

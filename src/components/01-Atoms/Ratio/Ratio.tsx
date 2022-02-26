import { memo, useContext } from 'react';
import RatioStyles from './Ratio.styles';
import Context from '../../Context';

function Ratio() {
  const { contrast, colorState } = useContext(Context);

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

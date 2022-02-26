import { memo, useContext } from 'react';
import Badge from '../../01-Atoms/Badge/Badge.styles';
import Grade from '../../01-Atoms/Grade/Grade.styles';
import Result from '../../02-Molecules/Result/Result.styles';
import WcagStyles from './Wcag.styles';
import Context from '../../Context';

export interface WcagProps {
  id: string
}

function Wcag(props: WcagProps) {
  const { level, colorState } = useContext(Context);

  return (
    <WcagStyles {...props} color={colorState as string}>
      <Result>
        <Badge color={colorState as string}>{level && level.AALarge}</Badge>
        <Grade>AA Large</Grade>
      </Result>
      <Result>
        <Badge color={colorState as string}>{level && level.AAALarge}</Badge>
        <Grade>AAA Large</Grade>
      </Result>
      <Result>
        <Badge color={colorState as string}>{level && level.AA}</Badge>
        <Grade>AA Normal</Grade>
      </Result>
      <Result>
        <Badge color={colorState as string}>{level && level.AAA}</Badge>
        <Grade>AAA Normal</Grade>
      </Result>
    </WcagStyles>
  );
}

export default memo(Wcag);

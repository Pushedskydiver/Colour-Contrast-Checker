import React, { memo, useContext } from 'react';
import Badge from '../../01-Atoms/Badge/Badge.styles';
import Grade from '../../01-Atoms/Grade/Grade.styles';
import Result from '../../02-Molecules/Result/Result.styles';
import WcagStyles from './Wcag.styles';
import Context from '../../Context';

function Wcag(props) {
  const { level, colorState } = useContext(Context);

  return (
    <WcagStyles {...props}>
      <Result>
        <Badge color={colorState}>{level.AALarge}</Badge>
        <Grade>AA Large</Grade>
      </Result>
      <Result>
        <Badge color={colorState}>{level.AAALarge}</Badge>
        <Grade>AAA Large</Grade>
      </Result>
      <Result>
        <Badge color={colorState}>{level.AA}</Badge>
        <Grade>AA Normal</Grade>
      </Result>
      <Result>
        <Badge color={colorState}>{level.AAA}</Badge>
        <Grade>AAA Normal</Grade>
      </Result>
    </WcagStyles>
  );
}

export default memo(Wcag);

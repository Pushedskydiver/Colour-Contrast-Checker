import React from 'react';
import Badge from '../../01-Atoms/Badge/Badge.styles';
import Grade from '../../01-Atoms/Grade/Grade.styles';
import Result from '../../02-Molecules/Result/Result.styles';
import WcagStyles from './Wcag.styles';

const Wcag = React.memo(props => (
  <WcagStyles {...props}>
    <Result>
      <Badge color={props.colorState}>{props.level.AALarge}</Badge>
      <Grade>AA Large</Grade>
    </Result>
    <Result>
      <Badge color={props.colorState}>{props.level.AAALarge}</Badge>
      <Grade>AAA Large</Grade>
    </Result>
    <Result>
      <Badge color={props.colorState}>{props.level.AA}</Badge>
      <Grade>AA Normal</Grade>
    </Result>
    <Result>
      <Badge color={props.colorState}>{props.level.AAA}</Badge>
      <Grade>AAA Normal</Grade>
    </Result>
  </WcagStyles>
));

export default Wcag;

import React from 'react';
import Badge from '../../01-Atoms/Badge/Badge.styles';
import Grade from '../../01-Atoms/Grade/Grade.styles';
import Result from '../../02-Molecules/Result/Result.styles';
import WcagStyles from './Wcag.styles';

const Wcag = props => (
  <WcagStyles {...props}>
    <Result>
      <Badge color={props.colorState}>{props.level[0].AALarge}</Badge>
      <Grade>AA Large</Grade>
    </Result>
    <Result>
      <Badge color={props.colorState}>{props.level[2].AAALarge}</Badge>
      <Grade>AAA Large</Grade>
    </Result>
    <Result>
      <Badge color={props.colorState}>{props.level[1].AA}</Badge>
      <Grade>AA Normal</Grade>
    </Result>
    <Result>
      <Badge color={props.colorState}>{props.level[3].AAA}</Badge>
      <Grade>AAA Normal</Grade>
    </Result>
  </WcagStyles>
);

export default Wcag;
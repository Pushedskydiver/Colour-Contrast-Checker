import { memo } from 'react';
import Badge from '../../01-Atoms/Badge/Badge.styles';
import Grade from '../../01-Atoms/Grade/Grade.styles';
import { Tick, Cross } from '../../01-Atoms/Icon/Icon';
import Result from '../../02-Molecules/Result/Result.styles';
import WcagStyles from './Wcag.styles';
import { useColourContrast } from '../../Context';

export interface WcagProps {
  id: string
}

function Wcag(props: WcagProps) {
  const { level, colorState } = useColourContrast();
  const { AALarge, AAALarge, AA, AAA } = level;

  return (
    <WcagStyles {...props} color={colorState} aria-label="Colour contrast grades">
      <Result
        aria-live="polite"
        aria-label={`AA Large. ${AALarge === 'Pass' ? 'Pass' : 'Fail'}`}
      >
        <Grade aria-hidden="true">AA Large</Grade>
        <Badge color={colorState} aria-hidden="true">
          {AALarge}
          {AALarge === 'Pass' ? <Tick /> : <Cross />}
        </Badge>
      </Result>

      <Result
        aria-live="polite"
        aria-label={`AAA Large. ${AAALarge === 'Pass' ? 'Pass' : 'Fail'}`}
      >
        <Grade aria-hidden="true">AAA Large</Grade>
        <Badge color={colorState} aria-hidden="true">
          {AAALarge}
          {AAALarge === 'Pass' ? <Tick /> : <Cross />}
        </Badge>
      </Result>

      <Result
        aria-live="polite"
        aria-label={`AA. ${AA === 'Pass' ? 'Pass' : 'Fail'}`}
      >
        <Grade aria-hidden="true">AA Normal</Grade>
        <Badge color={colorState} aria-hidden="true">
          {AA}
          {AA === 'Pass' ? <Tick /> : <Cross />}
        </Badge>
      </Result>

      <Result
        aria-live="polite"
        aria-label={`AAA. ${AAA === 'Pass' ? 'Pass' : 'Fail'}`}
      >
        <Grade aria-hidden="true">AAA Normal</Grade>
        <Badge color={colorState} aria-hidden="true">
          {AAA}
          {AAA === 'Pass' ? <Tick /> : <Cross />}
        </Badge>
      </Result>
    </WcagStyles>
  );
}

export default memo(Wcag);

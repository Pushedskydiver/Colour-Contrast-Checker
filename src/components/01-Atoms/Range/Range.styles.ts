import styled, { css } from 'styled-components';
import { rgba } from '../../../styles/settings.colors.styles';
import { minWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

export interface RangeProps {
  color: string
}

const Range = styled.input<RangeProps>`
  display: block;
  width: 100%;
  height: 6px;
  margin-top: ${spacing.margin}px;
  margin-bottom: ${spacing.margin}px;
  border-radius: 20px;

  &::-webkit-slider-thumb {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    appearance: none;
  }

  ${minWidth(992, () => css`
    &::-webkit-slider-thumb {
      width: 25px;
      height: 25px;
    }
  `)}

  ${props => props.color && css`
    background-color: ${rgba(props.color, 0.3)};

    &::-webkit-slider-thumb {
      background-color: ${props.color};
    }
  `}
`;

export default Range;

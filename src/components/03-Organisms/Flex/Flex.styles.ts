import styled, { css } from 'styled-components';
import { minWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

export enum JustifyContentProps {
  start = 'flex-start',
  end = 'flex-end',
  center = 'center',
  between = 'space-between',
  around = 'space-around',
  evenly = 'space-evenly'
}

export enum AlignItemsProps {
  start = 'flex-start',
  end = 'flex-end',
  center = 'center',
  stretch = 'stretch',
  baseline = 'baseline'
}

export interface FlexProps {
  justify?: JustifyContentProps
  align?: AlignItemsProps
  noMargin?: boolean
}

const Flex = styled.section<FlexProps>`
  ${minWidth(992, () => css`
    display: flex;
    flex-wrap: wrap;
  `)}

  ${props => !props.noMargin && css`
    margin-bottom: ${spacing.margin * 3}px;
  `}

  ${props => props.noMargin && css`
    margin: 0;
  `}

  ${props => props.justify === JustifyContentProps.between && css`
    ${minWidth(992, () => css`
      justify-content: space-between;
    `)}
  `}

  ${props => props.align === AlignItemsProps.center && css`
    ${minWidth(992, () => css`
      align-items: center;
    `)}
  `}
`;

export default Flex;

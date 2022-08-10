import styled, { css } from 'styled-components';
import { minWidth, maxWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

export interface WcagProps {
  color: string
}

const Wcag = styled.ul<WcagProps>`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.margin}px ${spacing.margin / 1.5}px;
  margin-bottom: 0px;
  padding: 0px;

  ${props => props.color && css`
    color: ${props.color};
  `}

  ${maxWidth(992, () => css`
    justify-content: space-between;
    margin-top: ${spacing.margin * 2.5}px;
  `)}

  ${minWidth(992, () => css`
    gap: ${spacing.margin}px;
    text-align: right;
  `)}
`;

export default Wcag;

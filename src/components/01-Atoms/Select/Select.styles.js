import styled, { css } from 'styled-components';
import { typography } from '../../../styles/settings.typography.styles';
import { minWidth, maxWidth } from '../../../styles/settings.breakpoints.styles';
import spacing from '../../../styles/settings.spacing.styles';

const Select = styled.select`
  display: block;
  width: 100%;
  color: inherit;
  font-size: ${typography.heading.size.small};
  line-height: normal;
  cursor: pointer;
`;

export const SelectWrapper = styled.div`
  position: relative;

  ${maxWidth('768', () => css`
    margin-top: ${spacing.margin}px;
  `)}

  ${minWidth('768', () => css`
    margin-left: ${spacing.margin * 1.5}px
  `)}
`;

export default Select;

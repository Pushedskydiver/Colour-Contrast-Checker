import styled, { css } from 'styled-components';
import { typography } from '../../../styles/settings.typography.styles';
import { minWidth } from '../../../styles/settings.breakpoints.styles';

const InputStyles = styled.input`
  width: 100%;
  border-bottom: 2px solid transparent;
  color: inherit;
  font-size: ${typography.heading.size.big};
  transition: border-bottom-color 0.3s ease-in-out;

  &:active,
  &:focus {
    border-bottom-color: currentColor;
  }

  ${minWidth('768', () => css`
    font-size: ${typography.heading.size.large};
  `)}
`;

export default InputStyles;

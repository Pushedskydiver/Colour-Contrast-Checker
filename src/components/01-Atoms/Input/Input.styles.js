import styled, { css } from 'styled-components';
import { typography } from '../../../styles/settings.typography.styles';
import { minWidth } from '../../../styles/settings.breakpoints.styles';

const InputStyles = styled.input`
  width: 100%;
  color: inherit;
  font-size: ${typography.heading.size.big};

  ${minWidth('768', () => css`
    font-size: ${typography.heading.size.large};
  `)}
`;

export default InputStyles;
